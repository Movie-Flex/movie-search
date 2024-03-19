const Razorpay = require('razorpay');
const PaymentDetail = require('../models/payment');
const { verifyToken } = require('../middlewares/verifyToken');
const { connectToDatabaseWithSchema, connectToDatabase } = require('../databases/db');
const { v4: uuidv4 } = require('uuid');
const { getUser } = require('../middlewares/getUserFromToken');

// Create an instance of Razorpay
const razorPayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

const mongoURI = process.env.MONGODB_URI;
const dbName = 'sample_mflix';
const collectionName = 'subscription_meta';

const dashboardTest = async (req, res)=>{
    const { client: connectedClient, collection } = await connectToDatabase(dbName, collectionName); 
        client = connectedClient;
        
        const subscription_meta = await collection.findOne({}); 
   res.render('../pages/dashboard', {subscription_meta : subscription_meta}); 
}

// need to add email ----------------------------------------- in database
const orderTest = async (req, res) => {
    let db;
    try {
        db = await connectToDatabaseWithSchema(mongoURI);
        const { client: connectedClient, collection } = await connectToDatabase(dbName, collectionName); 
        client = connectedClient;
        
        const subscription_meta = await collection.findOne({}); 
        const {token} = req.body
        const subscription = req.query.type;

        // handle free subscription 
        
        const duration = req.query.dur; 
        const typeInfo = subscription_meta.subscriptionTypes[0][subscription];
        if (!duration || !subscription) {
            return res.status(400).json({error :"Missing query type / dur "});
        }
        const fee = duration === 'feeMonthly' ? typeInfo.feeMonthly : typeInfo.feeYearly;
        const params = {
            amount: fee * typeInfo.subunit,
            currency: typeInfo.currency,
            receipt: uuidv4(),
            payment_capture: "1"
        };

        const response = await razorPayInstance.orders.create(params);
        const user = getUser(token)

        const paymentDetail = new PaymentDetail({
            orderId: response.id,
            receiptId: response.receipt,
            email : user.email,
            username : user.username,
            currency: response.currency,
            subunit: typeInfo.subunit,
            amount: response.amount,
            status: response.status,
            subscription: subscription,
            role : user.role,
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



const verifyTest = async (req, res) => {
    let db;
    try {
        db = await connectToDatabaseWithSchema(mongoURI);
        const razorpay_order_id = req.body.razorpay_order_id
        const razorpay_payment_id = req.body.razorpay_payment_id
        const razorpay_signature = req.body.razorpay_signature
        const token = req.body.token

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
            const updatedPayment = await PaymentDetail.findOneAndUpdate({ orderId: razorpay_order_id },
                {
                    paymentId: razorpay_payment_id,
                    signature:razorpay_signature,
                    status: "paid"
                },
                { new: true }
            ).exec();
            const user = getUser(token) // updating user based on subscription
            const newSubscription = updatedPayment.subscription
            const role = updatedPayment.role
            const newToken = generateToken(user, role, newSubscription)
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

module.exports = { verifyTest, orderTest , dashboardTest};
