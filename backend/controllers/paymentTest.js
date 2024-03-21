const Razorpay = require('razorpay');
const PaymentDetail = require('../models/payment');
const { verifyToken } = require('../middlewares/verifyToken');
const { connectToDatabaseWithSchema, connectToDatabase } = require('../databases/db');
const { v4: uuidv4 } = require('uuid');
const { getUser } = require('../middlewares/getUserFromToken');
const {SubscriptionMeta} = require('../models/subscriptionMeta')
const Subscriptions = require('../models/subscription')

// Create an instance of Razorpay
const razorPayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

const mongoURI = process.env.MONGODB_URI;



const dashboardTest = async (req, res)=>{
    db = await connectToDatabaseWithSchema(mongoURI);
    const subscription_meta = await SubscriptionMeta.findOne({});
        
   res.render('../pages/dashboard', {subscription_meta : subscription_meta}); 
}


const orderTest = async (req, res) => {
    let db;
    try {
        db = await connectToDatabaseWithSchema(mongoURI);
        const subscriptionMeta = await SubscriptionMeta.findOne({}).sort({ updatedDate: -1 });

        const subscription = req.query.type;
        const duration = req.query.dur; 
        // const {token} = req.body
        // const user = getUser(token)
        const email = 'test@gmail.com'
        
        const oldPaymentDetail = await PaymentDetail.findOne({ email: email }).sort({ updatedDate: -1 });

        if(oldPaymentDetail && oldPaymentDetail.subscription === 'premium'){
            return res.status(400).json({message: "Premium subscription is already activated. You can upgrade it to Diamond subscription"});
        }else if( oldPaymentDetail && oldPaymentDetail.subscription === 'diamond'){
            return res.status(400).json({message: "Diamond subscription is already activated."});
        }

        if (!duration || !subscription) {
            return res.status(400).json({error: "Missing query type / dur"});
        }

        if (subscription === 'free') {
            return res.status(400).json({message: "Free subscription activated"});
        }

        const typeInfo = subscriptionMeta[subscription];
        const fee = typeInfo[duration]

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
            name : typeInfo.name,
            description : typeInfo.description,
            duration: duration ,
            currency: response.currency,
            subunit: typeInfo.subunit,
            amount: response.amount,
            status: response.status,
            subscription: subscription,
            role :"standard_user",
            email: "test@gmail.com", // update
            username: "test",// update
            
        });

        // await paymentDetail.save();
        res.render('../pages/checkout', {
            razorpayKeyId: process.env.RAZORPAY_KEY_ID,
            paymentDetail: paymentDetail
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }finally{
        if(db){
            db.close();
        }
    }
};



const verifyTest = async (req, res) => {
    let db;
    try {
        db = await connectToDatabaseWithSchema(mongoURI);
        const razorpay_order_id = req.body.razorpay_order_id
        const razorpay_payment_id = req.body.razorpay_payment_id
        const razorpay_signature = req.body.razorpay_signature
        const paymentDetailString = req.body.paymentDetail


        const validJsonString = paymentDetailString
        .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":') 
        .replace(/'([^']+)'/g, '"$1"') 
        .replace(/"_id":\s*new\s*ObjectId\([^)]*\),?/g, ''); 
    
        console.log(validJsonString);
        console.log(validJsonString.amount)
        console.log(validJsonString["amount"])

        const jsonObject = JSON.parse(validJsonString);

        console.log(jsonObject.amount)
        console.log(jsonObject["amount"])


        // const token = req.body.token
        // const user = getUser(token)
        const email = "test@gmail.com"

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
            const updatedPayment = new PaymentDetail(
                {
                    paymentId: razorpay_payment_id,
                    signature:razorpay_signature,
                    status :  paymentDetail.status,
                    orderId: paymentDetail.orderId,
                    receiptId: paymentDetail.receiptId,
                    duration: paymentDetail.duration ,
                    currency: paymentDetail.currency,
                    subunit: paymentDetail.subunit,
                    amount: paymentDetail.amount,
                    updatedDate : new Date,
                    status: paymentDetail.status,
                    email: paymentDetail.email, // update
                    username: paymentDetail.username,// update

                    paidStatus: "paid",
                    paidDate : new Date,
                    amount : paymentDetail.amount,
                    paidAmount : paymentDetail.amount,
                    netAmount : paymentDetail.amount,
                    subscription : paymentDetail.subscription,
                }
            );
            await updatedPayment.save();
             // update subsciption in  database
            await Subscriptions.findOneAndUpdate({ email: paymentDetail.email }, { $set: { subscription: paymentDetail.subscription } });

            // const newToken = generateToken(paymentDetail.username, paymentDetail.role, updatedPayment.subscription)

            
            res.render('../pages/success', {
                title: "Payment verification successful",
                paymentDetail: updatedPayment
            });
        } else {
            return res.status(400).json({error : "Payment verification failed due to mismatch of signature."})  
        }
    } catch (error) {
        console.error("Error verifying payment:", error);
        return res.status(500).json({error : "Internal server error"})
    }finally{
        if(db){
            db.close();
        }
    }
};


const refundTest = async (req, res) => {
    let db;
    try {
        // const { token } = req.body;
        // const user = getUser(token); 
        const newSubscription = req.query.to

        const email = "test@gmail.com" // user.email
        
        db = await connectToDatabaseWithSchema(mongoURI);
        const paymentDetail = await PaymentDetail.findOne({ email: email }).sort({ updatedDate: -1 });
        if(paymentDetail.netAmount <= 0 || paymentDetail.subscription === 'free'){
            return res.status(200).json({ message:"No active subscription."});
        }
        if (!paymentDetail) {
            return res.status(404).json({ error: "Payment details not found for the user" });
        }

        const subscriptionMeta = await SubscriptionMeta.findOne({});

        // information regarding existing subscription
        const oldSubscription = paymentDetail.subscription
        const duration = paymentDetail.duration
        const oldTypeInfo = subscriptionMeta[oldSubscription];
        const oldFee = oldTypeInfo[duration];

        // information regarding new subscription( downgraded subscription)
        const newTypeInfo =subscriptionMeta[newSubscription];
        const newFee = newTypeInfo[duration];
        
        if((oldFee - newFee) <=0){
            return res.status(200).json({ message:"Cannot initiates refund due to insufficient balance."});
        }

        const refundResponse = await razorPayInstance.payments.refund(paymentDetail.paymentId, {
            amount: oldFee - newFee
        });

        if (refundResponse.status === 'processed') {
            const refundDetails = await PaymentDetail.findOneAndUpdate({ email: email },
                {
                    refundId: refundResponse.id ,
                    refundStatus :"refunded",
                    refundAmount : refundResponse.amount*newTypeInfo.subunit,
                    refundDate: new Date,
                    netAmount : paymentDetail.netAmount -  refundResponse.amount*newTypeInfo.subunit,
                    subscription : newSubscription
                },
                { new: true }
            ).exec();
            // update subsciption in  database
            await Subscriptions.findOneAndUpdate({ email: email }, { $set: { subscription: newSubscription } });
            // const newToken = generateToken(user, refundDetails.role, refundDetails.subscription) 

            return res.status(200).json({ message: `${refundDetails.currency} ${refundDetails.refundAmount} refunded to your linked account.`, refundDetails });   


        } else {
            return res.status(400).json({ error: "Refund failed", refundResponse });
        }
    } catch (error) {
        console.error("Error occurred during refund:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }finally{
        if(db){
            db.close();
        }
    }
};


// upgrade only from a premium subscription to diamond subscription
const upgradeSubscriptionTest = async (req, res) => {
    try {
        // const { token } = req.body;
        // const user = getUser(token)
        const email = "test@gmail.com"
        

        db = await connectToDatabaseWithSchema(mongoURI);
        const paymentDetail = await PaymentDetail.findOne({ email: email }).sort({ updatedDate: -1 });

        if (!paymentDetail) {
            return res.status(404).json({ error: "Payment details not found for the user" });
        }

        if(paymentDetail.subscription === 'free'){
            return res.status(200).json({ message:"No active subscription. Consider taking a new subscription."});
        }else if(paymentDetail.subscription === 'diamond'){
            return res.status(200).json({ message: "Already a diamond subscriber. Cannot upgrade." });
        }

        // if premium, then upgrade to diamond
        const subscriptionMeta = await SubscriptionMeta.findOne({});
        console.log(subscriptionMeta)
        const duration = paymentDetail.duration
        const typeInfo = subscriptionMeta.upgrade;
        const fee = typeInfo[duration];

        // Create a new order for the upgraded subscription
        const params = {
            amount: fee,
            currency: typeInfo.currency,
            receipt: uuidv4(),
            payment_capture: "1"
        };

        const upgradeResponse = await razorPayInstance.orders.create(params);
        console.log(upgradeResponse)

        const upgradeDetails = await PaymentDetail.findOneAndUpdate({ email: email },
            {
                upgradeId: upgradeResponse.id ,
                upgradeStatus :upgradeResponse.status,
                upgradeAmount : upgradeResponse.amount*typeInfo.subunit,
                updatedDate: new Date,
                netAmount : paymentDetail.netAmount +  upgradeResponse.amount*typeInfo.subunit,
            },
            { new: true }
        ).exec();

        // const newToken = generateToken(user, upgradeDetails.role, "diamond") 

        return res.status(200).json({ message: "Subscription upgrade successful", upgradeDetails, upgradeResponse });

    } catch (error) {
        console.error("Error occurred during subscription upgrade:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};



module.exports = { verifyTest, orderTest , dashboardTest, refundTest,upgradeSubscriptionTest};
