const Razorpay = require('razorpay');
const PaymentDetail = require('../models/payment');
const { verifyToken } = require('../middlewares/verifyToken');
const { connectToDatabaseWithSchema, connectToDatabase } = require('../databases/db');
const { v4: uuidv4 } = require('uuid');

// Create an instance of Razorpay
const razorPayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

const mongoURI = process.env.MONGODB_URI;
const dbName = 'sample_mflix';
const collectionName = 'subscription_meta';

// need to add email ----------------------------------------- in database
const checkout = async (req, res) => {
    let db;
    try {
        db = await connectToDatabaseWithSchema(mongoURI);
        const { client: connectedClient, collection } = await connectToDatabase(dbName, collectionName); 
        client = connectedClient;
        
        const subscription_meta = await collection.findOne({}); 

        const SubscriptionType = req.query.type;
        const duration = req.query.dur; 
        const typeInfo = subscription_meta.subscription_types[0][SubscriptionType];

        if (!duration || !SubscriptionType) {
            return res.status(400).json({error :"Missing query type or dur "});
        }
        const fee = duration === 'fee_monthly' ? typeInfo.fee_monthly : typeInfo.fee_yearly;
        const params = {
            amount: fee * typeInfo.subunit,
            currency: typeInfo.currency,
            receipt: uuidv4(),
            payment_capture: "1"
        };

        const response = await razorPayInstance.orders.create(params);

        const paymentDetail = new PaymentDetail({
            orderId: response.id,
            receiptId: response.receipt,
            
            currency: response.currency,
            subunit: typeInfo.subunit,
            amount: response.amount,
            status: response.status,
            SubscriptionType: SubscriptionType,
            duration: duration 
        });
        await paymentDetail.save();

        // Render order confirmation page
        res.render('../pages/checkout', {
            razorpayKeyId: process.env.RAZORPAY_KEY_ID,
            paymentDetail: paymentDetail
        });
    } catch (err) {
        // Handle errors
        console.error(err);
        res.status(500).json({error : "Internal Server Error"});
    }
};



const verifyPayment = async (req, res) => {
    let db;
    try {
        db = await connectToDatabaseWithSchema(mongoURI);
        const body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
        const crypto = require("crypto");
        const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest('hex');
        
        if(expectedSignature === req.body.razorpay_signature) {
            // If signature matches, update payment details
            const updatedPayment = await PaymentDetail.findOneAndUpdate(
                { orderId: req.body.razorpay_order_id },
                {
                    paymentId: req.body.razorpay_payment_id,
                    signature: req.body.razorpay_signature,
                    status: "paid"
                },
                { new: true }
            ).exec();

            // Render payment success page if update is successful
            res.render('../pages/success', {
                title: "Payment verification successful",
                paymentDetail: updatedPayment
            });
        } else {
            // If signature doesn't match, render failure page
            res.render('../pages/fail', {
                title: "Payment verification failed",
            });
        }
    } catch (error) {
        // Handle any errors that occurred during payment verification
        console.error("Error verifying payment:", error);
        res.render('../pages/error', {
            title: "An error occurred during payment verification",
            error: error
        });
    }
};

module.exports = { verifyPayment, checkout };
