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
	duration : {
		type : String,
		enum: ['fee_monthly', 'fee_yearly'],
        default: 'fee_monthly'
	}
})

module.exports = mongoose.model('PaymentDetail', paymentDetailsSchema)