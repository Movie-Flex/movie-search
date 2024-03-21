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
    }
});

const subscriptionTypesSchema = new mongoose.Schema({
    free: subscriptionTypeSchema,
    premium: subscriptionTypeSchema,
    diamond: subscriptionTypeSchema,
});
const mongoURI = process.env.MONGODB_URI;
const SubscriptionMeta = mongoose.model('SubscriptionMeta', subscriptionTypesSchema);

//  This function creates a new document only once
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
                    features: [],
                    currency: "USD",
                    subunit: "100",
                    feeMonthly: 0,
                    feeYearly: 0
                },
                premium: {
                    name : "Premium Subscription",
                    description :  "Premium Subscription",
                    updatedDate : new Date,
                    features: [],
                    currency: "USD",
                    subunit: "100",
                    feeMonthly: 19,
                    feeYearly: 210
                },
                diamond: {
                    name : "Diamond Subscription",
                    description :  "Diamond Subscription",
                    updatedDate : new Date,
                    features: [],
                    currency: "USD",
                    subunit: "100",
                    feeMonthly: 39,
                    feeYearly: 450
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
