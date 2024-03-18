const mongoose = require('mongoose')

const paymentDetailsSchema = new mongoose.Schema({
	orderId: {
		type: String,
		required: true
	},
	receiptId: {
		type: String
	},
	paymentId: {
		type: String,
	},
	signature: {
		type: String,
	},
	email :{
		type : String
	},
	username :{
		type : String
	},
	amount: {
		type: Number
	},
	subunit :{
		type : Number
	},
	currency: {
		type: String
	},
	createdAt: {
        type: Date,
        default: Date.now
    },
	status: {
		type: String
	},
	subscription : {
		type: String
	},
	role : {
		type: String
	},
	duration : {
		type : String,
		enum: ['feeMonthly', 'feeYearly'],
        default: 'feeMonthly'
	}
})

module.exports = mongoose.model('PaymentDetail', paymentDetailsSchema)