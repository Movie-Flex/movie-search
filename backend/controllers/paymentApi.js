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

        return res.status(200).json({razorpayKeyId : process.env.RAZORPAY_KEY_ID,paymentDetail: paymentDetail})

    } catch (err) {
        // Handle errors
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};



const verifyPayment = async (req, res) => {
    let db;
    try {
        db = await connectToDatabaseWithSchema(mongoURI);
        const razorpay_order_id = req.body.razorpay_order_id
        const razorpay_payment_id = req.body.razorpay_payment_id
        const razorpay_signature = req.body.razorpay_signature

        if(!razorpay_order_id){
            return res.status(400).json({error : "Razorpay order id  (razorpay_order_id) missing."})  
        }
        if(!razorpay_payment_id){
            return res.status(400).json({error : "Razorpay payment id (razorpay_payment_id) missing."})  
        }
        if(!razorpay_signature){
            return res.status(400).json({error : "Razorpay signature  (razorpay_signature) missing."})  
        }
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const crypto = require("crypto");
        const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest('hex');
        
        if(expectedSignature === razorpay_signature) {
            // If signature matches, update payment details
            const updatedPayment = await PaymentDetail.findOneAndUpdate(
                { orderId: razorpay_order_id },
                {
                    paymentId: razorpay_payment_id,
                    signature:razorpay_signature,
                    status: "paid"
                },
                { new: true }
            ).exec();
            
            return res.status(200).json({ paymentDetail: updatedPayment})  
        } else {
            return res.status(400).json({error : "Payment verification failed due to mismatch of signature."})  
        }
    } catch (error) {
        console.error("Error verifying payment:", error);
        return res.status(500).json({error : "Internal server error"})
    }
};

module.exports = { verifyPayment, checkout };
