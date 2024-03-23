const Razorpay = require('razorpay');
const PaymentDetail = require('../models/payment');
const { verifyToken } = require('../middlewares/verifyToken');
const { generateToken } = require('../middlewares/generateToken');
const { connectToDatabaseWithSchema, connectToDatabase } = require('../databases/db');
const { v4: uuidv4 } = require('uuid');
const { getUser } = require('../middlewares/getUserFromToken');
const { SubscriptionMeta } = require('../models/subscriptionMeta')
const Subscriptions = require('../models/subscription');


// Create an instance of Razorpay
const razorPayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

const mongoURI = process.env.MONGODB_URI;



const dashboard = async (req, res) => {
    let db;
    try {
        db = await connectToDatabaseWithSchema(mongoURI);
        const subscriptionMeta = await SubscriptionMeta.findOne({}).sort({ updatedDate: -1 });

        return res.status(200).json({ subscriptionMeta: subscriptionMeta });
    } catch (error) {
        console.log("Error occurred: ", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


const order = async (req, res) => {
    let db;
    try {
        

        const subscription = req.query.type;
        const duration = req.query.dur;

        const bearer = req.headers['authorization'];
        if (!bearer) {
            return res.status(209).json({ message: 'No bearer token' });
        }
        const token = bearer.split(" ")[1];
        if (!token) {
            return res.status(209).json({ message: 'No authentication token found in bearer.' });
        }

        db = await connectToDatabaseWithSchema(mongoURI);
        const subscriptionMeta = await SubscriptionMeta.findOne({}).sort({ updatedDate: -1 });
        
        const user = getUser(token)

        const oldPaymentDetail = await PaymentDetail.findOne({ email: user.email }).sort({ updatedDate: -1 });

        if (oldPaymentDetail && oldPaymentDetail.subscription == 'premium') {
            return res.status(209).json({ message: "Premium subscription is already Active." });
        } else if (oldPaymentDetail && oldPaymentDetail.subscription == 'diamond') {
            return res.status(209).json({ message: "Diamond subscription is already Active." });
        }

        if (!duration || !subscription) {
            return res.status(209).json({ message: "Missing query type / dur" });
        }

        if (subscription == 'free') {
            return res.status(200).json({ message: "Free subscription activated" });
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
            name: typeInfo.name,
            description: typeInfo.description,
            duration: duration,
            currency: response.currency,
            subunit: typeInfo.subunit,
            netAmount: response.amount,
            updatedDate : new Date,
            status: response.status,
            subscription: subscription,
            email: user.email,
            username: user.username,

        });
        const subscriptionDetails = {name : typeInfo.name, description : typeInfo.description}
        // await paymentDetail.save();
        return res.status(200).json({ razorpayKeyId: process.env.RAZORPAY_KEY_ID, paymentDetail: paymentDetail ,subscriptionDetails})

    } catch (err) {
        console.log("Error occurred: ", err);
        res.status(500).send("Internal Server Error");
    } finally {
        if (db) {
            db.close();
        }
    }
};

const verify = async (req, res) => {
    let db;
    try {
        db = await connectToDatabaseWithSchema(mongoURI);
        const paymentDetail = req.body.paymentDetail
        const razorpay_order_id = req.body.razorpay_order_id
        const razorpay_payment_id = req.body.razorpay_payment_id
        const razorpay_signature = req.body.razorpay_signature

        const bearer = req.headers['authorization'];
        if (!bearer) {
            return res.status(209).json({ message: 'No bearer token' });
        }
        const token = bearer.split(" ")[1];
        if (!token) {
            return res.status(209).json({ message: 'No authentication token found in bearer.' });
        }
        

        if (!razorpay_order_id) {
            return res.status(209).json({ message: "Razorpay order id  (razorpay_order_id) missing." })
        }
        if (!razorpay_payment_id) {
            return res.status(209).json({ message: "Razorpay payment id (razorpay_payment_id) missing." })
        }
        if (!razorpay_signature) {
            return res.status(209).json({ message: "Razorpay signature  (razorpay_signature) missing." })
        }

        const user = getUser(token)

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const crypto = require("crypto");
        const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest('hex');

        if (expectedSignature === razorpay_signature) {
            // If signature matches, add payment details to database.
            const successPayment = new PaymentDetail(
                {
                    paymentId: razorpay_payment_id,
                    signature: razorpay_signature,
                    orderId: paymentDetail.orderId,
                    receiptId: paymentDetail.receiptId,

                    email: paymentDetail.email,
                    username: paymentDetail.username,

                    status: "active",
                    duration: paymentDetail.duration,
                    currency: paymentDetail.currency,
                    subunit: paymentDetail.subunit,
                    netAmount: paymentDetail.netAmount,
                    updatedDate: new Date,

                    paymentStatus: "paid",
                    paymentDate: new Date,
                    paidAmount: paymentDetail.netAmount,

                    subscription: paymentDetail.subscription,
                    
                }
            );
            await successPayment.save();
            const newSubscription = await Subscriptions.findOneAndUpdate({ email: paymentDetail.email }, { $set: { subscription: paymentDetail.subscription } });
            const newToken = generateToken(user, user.role ,paymentDetail.subscription)
            return res.status(200).json({ paymentDetail: successPayment, token: newToken })
        } else {
            return res.status(209).json({ message : "Payment verification failed. Try again!" })
        }
    } catch (error) {
        console.log("Error occurred: ", err);
        return res.status(500).json({ error: "Internal server error" })
    }finally {
        if (db) {
            db.close();
        }
    }
};


const refund = async (req, res) => {
    let db;
    try {
        db = await connectToDatabaseWithSchema(mongoURI);

        const bearer = req.headers['authorization'];
        if (!bearer) {
            return res.status(209).json({ message: 'No bearer token' });
        }
        const token = bearer.split(" ")[1];
        if (!token) {
            return res.status(209).json({ message: 'No authentication token found in bearer.' });
        }
        
        const q = req.query.q;
        const user = getUser(token);
        const paymentDetail = await PaymentDetail.findOne({ email: user.email }).sort({ updatedDate: -1 });

        if (!paymentDetail) {
            return res.status(209).json({ message: "Payment details not found for the user" });
        }else if(paymentDetail.subscription == 'free' || paymentDetail.status == 'inactive'){
            return res.status(209).json({ message: "No active subscription to cancel." });
        }
        
        
        const duration = paymentDetail.duration
        const subscription = paymentDetail.subscription
        const paymentDate = paymentDetail.paymentDate
        const paidAmount = paymentDetail.paidAmount
        const millisecondsUsed = new Date() - paymentDate;
        const daysUsed = Math.floor(millisecondsUsed / ( 1000 * 60 * 60 * 24));

        const daysInMonth = new Date(paymentDate.getFullYear(), paymentDate.getMonth() + 1, 0).getDate();
        const daysInYear = (paymentDate.getFullYear()) % 4 == 0 ? 366 : 365;

        // checking a expired subscription
        if((duration == 'feeMonthly' && daysUsed >daysInMonth || duration == 'feeYearly' && daysUsed >daysInYear)){
            await Subscriptions.findOneAndUpdate({ email: user.email }, { $set: { subscription: "free"} });
            const newToken = generateToken(user, user.role,"free")
            return res.status(209).json({ message: "Subsciption expired", newToken });
        }

        // calculating amount based on remaining days and subscription
        const subscriptionMeta = await SubscriptionMeta.findOne({}).sort({ updatedDate: -1 });
        const charges = subscriptionMeta[subscription].charges;  // in decimal proportion

        let netRefund = 0
        if(duration == 'feeMonthly' && daysUsed <= daysInMonth){
            const remainingAmount = paidAmount*(1 - daysUsed/daysInMonth)    // in paisa
            netRefund = remainingAmount - remainingAmount*charges     // taxes and transaction charges : 10%
        }
       

        if(duration == 'feeYearly' && daysUsed <= daysInYear){
            const remainingAmount = paidAmount*(1 - daysUsed/daysInYear) 
            netRefund = remainingAmount - remainingAmount*charges 
        }

        if(q == 'refundInfo'){
            const refundDetails = {
                subscriptionDate : paymentDate,
                subscriptionType : subscription,
                status : paymentDetail.status,
                paidAmount : paidAmount,
                refundableAmount : netRefund,
                charges : charges*100 + " %",
                daysUsed : daysUsed
            }
            return res.status(200).json({refundDetails });
            
        }else if(q == 'refundTrue'){
            const refundResponse = await razorPayInstance.payments.refund(paymentDetail.paymentId, {
                amount: netRefund
            });
    
            if (refundResponse.status == 'processed') {
                await PaymentDetail.findOneAndUpdate({ email: user.email }, {
                     status: "inactive" ,
                     updatedDate : new Date,
                     refundAmount : refundResponse.amount,
                     refundDate : new Date,
                     refundId : refundResponse.id,
                     refundStatus : "refunded",
                     netAmount : paymentDetail.netAmount - refundResponse.amount,
                     subscription : "free"
                    });
    
            await Subscriptions.findOneAndUpdate({ email: user.email }, { $set: { subscription: "free"} });
            const newToken = generateToken(user, user.role,"free")
            const cancelledSubscription = await PaymentDetail.findOne({ email: user.email }).sort({ updatedDate: -1 });

            return res.status(200).json({ message: "Subscription cancelled and refund processed.", newToken,refundInfo :  cancelledSubscription });
    
            } else {
                return res.status(209).json({ message: "Refund failed", refundResponse });
            }
        } 
    } catch (err) {
        console.log("Error occurred: ", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }finally {
        if (db) {
            db.close();
        }
    }
};



module.exports = {
    dashboard: [verifyToken, dashboard],
    order: [verifyToken, order],
    verify: [verifyToken, verify],
    refund: [verifyToken, refund],
};
