const mongoose = require('mongoose');
const { connectToDatabaseWithSchema, connectToDatabase } = require('../databases/db');
const subscriptionTypeSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    features: {
        type: [String],
        default: []
    },
    currency: {
        type: String,
        required: true
    },
    subunit: {
        type: String,
        required: true
    },
    feeMonthly: {
        type: Number,
        required: true
    },
    feeYearly: {
        type: Number,
        required: true
    },
    updatedDate :{
        type : Date,
    },
    charges :{
        type : Number
    }
});

const subscriptionTypesSchema = new mongoose.Schema({
    free: subscriptionTypeSchema,
    premium: subscriptionTypeSchema,
    diamond: subscriptionTypeSchema,
});
const mongoURI = process.env.MONGODB_URI;
const SubscriptionMeta = mongoose.model('SubscriptionMeta', subscriptionTypesSchema);

//  This function creates a new meta document only once
const createDefaultDocument = async () => {
    let db;
    try {
        db = await connectToDatabaseWithSchema(mongoURI);
        const existingDocument = await SubscriptionMeta.findOne({});
        if (!existingDocument) {
            const defaultSubscriptionMeta = {
                free: {
                    name : 'Free Subsciption',
                    description :  "Free Subscription",
                    updatedDate : new Date,
                    features: [
                        "Limited access to premium content",
                        "Basic support",
                        "Ads-supported experience"
                    ],
                    currency: "USD",
                    subunit: "100",
                    feeMonthly: 0,
                    feeYearly: 0,
                    charges : 0.1
                },
                premium: {
                    name : "Premium Subscription",
                    description :  "Premium Subscription",
                    updatedDate : new Date,
                    features: [
                        "Full access to premium content",
                        "Priority support",
                        "Ad-free experience"
                    ],
                    currency: "USD",
                    subunit: "100",
                    feeMonthly: 19,
                    feeYearly: 210,
                    charges : 0.1
                },
                diamond: {
                    name : "Diamond Subscription",
                    description :  "Diamond Subscription",
                    updatedDate : new Date,
                    features: [
                        "VIP access to exclusive content",
                        "24/7 dedicated support",
                        "Ad-free experience"
                    ],
                    currency: "USD",
                    subunit: "100",
                    feeMonthly: 39,
                    feeYearly: 450,
                    charges : 0.1
                },
            };
            await SubscriptionMeta.create(defaultSubscriptionMeta);
            console.log("Default SubscriptionMeta document created successfully.");
        }
    } catch (error) {
        console.error("Error creating default SubscriptionMeta document:", error);
    }
};

createDefaultDocument(); 

module.exports = { SubscriptionMeta };