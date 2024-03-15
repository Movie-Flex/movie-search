const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    subscription: {
        type: String,
        enum: ['free', 'diamond', 'premium'],
        default: 'free'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Subscriptions = mongoose.model('Subscriptions', subscriptionSchema);

module.exports = Subscriptions;
