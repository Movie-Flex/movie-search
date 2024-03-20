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
        console.error("Error occurred:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


const order = async (req, res) => {
    let db;
    try {
        db = await connectToDatabaseWithSchema(mongoURI);
        const subscriptionMeta = await SubscriptionMeta.findOne({}).sort({ updatedDate: -1 });

        const subscription = req.query.type;
        const duration = req.query.dur;
        const { token } = req.body
        const user = getUser(token)
        console.log(user)
        const email = user.email

        const oldPaymentDetail = await PaymentDetail.findOne({ email: email }).sort({ updatedDate: -1 });
        console.log(oldPaymentDetail)
        if (oldPaymentDetail && oldPaymentDetail.subscription === 'premium'&& oldPaymentDetail.status === 'active') {
            return res.status(400).json({ message: "Premium subscription is Active." });
        } else if (oldPaymentDetail && oldPaymentDetail.subscription === 'diamond' && oldPaymentDetail.status === 'active') {
            return res.status(400).json({ message: "Diamond subscription is Active." });
        }

        if (!duration || !subscription) {
            return res.status(400).json({ error: "Missing query type / dur" });
        }

        if (subscription === 'free') {
            return res.status(400).json({ message: "Free subscription activated" });
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
            status: response.status,
            subscription: subscription,
            email: user.email,
            username: user.username

        });

        // await paymentDetail.save();
        return res.status(200).json({ razorpayKeyId: process.env.RAZORPAY_KEY_ID, paymentDetail: paymentDetail })

    } catch (err) {
        console.error(err);
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
        const token = req.body.token
        const user = getUser(token)

        if (!razorpay_order_id) {
            return res.status(400).json({ error: "Razorpay order id  (razorpay_order_id) missing." })
        }
        if (!razorpay_payment_id) {
            return res.status(400).json({ error: "Razorpay payment id (razorpay_payment_id) missing." })
        }
        if (!razorpay_signature) {
            return res.status(400).json({ error: "Razorpay signature  (razorpay_signature) missing." })
        }
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

                    paymentStatus: "paid",
                    paymentDate: new Date,
                    paidAmount: paymentDetail.netAmount,

                    subscription: paymentDetail.subscription,
                }
            );
            await successPayment.save();

            await Subscriptions.findOneAndUpdate({ email: paymentDetail.email }, { $set: { subscription: paymentDetail.subscription } });
            const newToken = generateToken(user, user.role, successPayment.subscription)

            return res.status(200).json({ paymentDetail: successPayment, token: newToken })
        } else {
            return res.status(400).json({ error: "Payment verification failed. Try again!" })
        }
    } catch (error) {
        console.error("Error verifying payment:", error);
        return res.status(500).json({ error: "Internal server error" })
    }finally {
        if (db) {
            db.close();
        }
    }
};


const cancel = async (req, res) => {
    let db;
    try {
        db = await connectToDatabaseWithSchema(mongoURI);
        const { token } = req.body;
        const user = getUser(token);
        const paymentDetail = await PaymentDetail.findOne({ email: user.email });

        if (!paymentDetail) {
            return res.status(404).json({ error: "Payment details not found for the user" });
        }else if(paymentDetail.subscription === 'free'){
            return res.status(200).json({ message: "Free subscription." });
        }else if(paymentDetail.status === 'cancelled'){
            return res.status(200).json({ message: "Subscription cancelled." });
        }
        
        
        const duration = paymentDetail.duration
        const paymentDate = paymentDetail.paymentDate
        const paidAmount = paymentDetail.paidAmount
        const millisecondsUsed = new Date() - paymentDate;
        const daysUsed = Math.floor(millisecondsUsed / ( 1000 * 60 * 60 * 24));

        // checking a expired subscription
        if((duration === 'feeMonthly' && daysUsed >31 || duration === 'feeYearly' && daysUsed >365)){
            await Subscriptions.findOneAndUpdate({ email: user.email }, { $set: { subscription: "free"} });
            const newToken = generateToken(user, user.role,"free")
            return res.status(200).json({ message: "Subsciption expired", newToken });
        }

        // calculating amount based on remaining days and subscription
        let netRefund = 0
        if(duration === 'feeMonthly' && daysUsed <= 31){
            const remainingAmount = paidAmount*(1 - daysUsed/31)    // in paisa
            netRefund = remainingAmount - remainingAmount*0.1      // taxes and transaction charges : 10%
            console.log(daysUsed, "\n", remainingAmount , "\n", netRefund)
        }
       

        if(duration === 'feeYearly' && daysUsed <= 365){
            const remainingAmount = paidAmount*(1 - daysUsed/31)    // in paisa
            netRefund = remainingAmount - remainingAmount*0.1      // taxes and transaction charges : 10%
            console.log(daysUsed, "\n", remainingAmount , "\n", netRefund)
        }
        

        const refundResponse = await razorPayInstance.payments.refund(paymentDetail.paymentId, {
            amount: netRefund
        });

        if (refundResponse.status === 'processed') {
            await PaymentDetail.findOneAndUpdate({ email: user.email }, {
                 status: "cancelled" ,
                 refundAmount : refundResponse.amount,
                 refundDate : new Date,
                 refundId : refundResponse.id,
                 refundStatus : "refunded",
                 netAmount : paymentDetail.netAmount - refundResponse.amount,
                });

        await Subscriptions.findOneAndUpdate({ email: user.email }, { $set: { subscription: "free"} });
        const newToken = generateToken(user, user.role,"free")
        const cancelledSubscription = await PaymentDetail.findOne({ email: user.email });
        
        return res.status(200).json({ message: "Subscription cancelled and refund processed.", newToken, cancelledSubscription });

        } else {
            return res.status(400).json({ error: "Refund failed", refundResponse });
        }
    } catch (error) {
        console.error("Error occurred during refund:", error);
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
    cancel: [verifyToken, cancel],
};
