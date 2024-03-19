const Razorpay = require('razorpay');
const PaymentDetail = require('../models/payment');
const { verifyToken } = require('../middlewares/verifyToken');
const { generateToken } = require('../middlewares/generateToken');
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
const collectionName = 'subscription_meta';  //schemaLess


const dashboard = async (req, res) => {
    try {
        const { client: connectedClient, collection } = await connectToDatabase(dbName, collectionName); 
        client = connectedClient;
        
        const subscription_meta = await collection.findOne({}); 
        
        return res.status(200).json({ subscription_meta: subscription_meta });
    } catch (error) {
        console.error("Error occurred:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


const order = async (req, res) => {
    let db;
    try {
        db = await connectToDatabaseWithSchema(mongoURI);
        const { client: connectedClient, collection } = await connectToDatabase(dbName, collectionName); 
        client = connectedClient;
        
        const subscription_meta = await collection.findOne({}); 
        const {token} = req.body
        const subscription = req.query.type;

        // handle free subscription 
        if(subscription === 'free'){
            return res.status(400).json({message :`Free subscription actiavted on ${Date.now}`});
        }

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

        return res.status(200).json({razorpayKeyId : process.env.RAZORPAY_KEY_ID,paymentDetail: paymentDetail})

    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};



const verify = async (req, res) => {
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

            
            return res.status(200).json({ paymentDetail: updatedPayment, token : newToken})  
        } else {
            return res.status(400).json({error : "Payment verification failed due to mismatch of signature."})  
        }
    } catch (error) {
        console.error("Error verifying payment:", error);
        return res.status(500).json({error : "Internal server error"})
    }
};


const refund = async (req, res) => {
    try {
        const { token, amount } = req.body;
        const user = getUser(token);
        const paymentDetail = await PaymentDetail.findOne({ email: user.email });

        if (!paymentDetail) {
            return res.status(404).json({ error: "Payment details not found for the user" });
        }

        const refundResponse = await razorPayInstance.payments.refund(paymentDetail.paymentId, {
            amount: amount * 100 
        });

        if (refundResponse.status === 'processed') {
            await PaymentDetail.findOneAndUpdate({ email: user.email }, { status: "refunded" });
            return res.status(200).json({ message: "Refund successful", refundResponse });
        } else {
            return res.status(400).json({ error: "Refund failed", refundResponse });
        }
    } catch (error) {
        console.error("Error occurred during refund:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


const upgrade = async(req, res) =>{
    const subscriptionId = ""
    const existingSubscription = await instance.subscriptions.fetch(subscriptionId);
    const upgradedOptions = {
        amount: 6900, 
        currency: 'INR',
        receipt: 'receipt_order_13',
        notes: {
        order_id: 'order_13',
        },
        };
        
        const upgradedSubscription = await instance.subscriptions.create(upgradedOptions);
        
        await instance.subscriptions.edit(subscriptionId, {
        subscription: upgradedSubscription.id,
        });
}

module.exports = { 
    verify :[verifyToken,verify], 
    order : [verifyToken,order] ,
    dashboard : [verifyToken, dashboard],
    refund : [verifyToken, refund],
    upgrade : [verifyToken, upgrade]};
