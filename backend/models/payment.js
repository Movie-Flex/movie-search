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
	duration : {
		type : String,
		enum: ['feeMonthly', 'feeYearly'],
	},
	currency: {
		type: String
	},
	subunit :{
		type : Number
	},
	subscription : {
		type: String
	},

	netAmount: { // overall amount left after paying or cancelled (left from taxes, etc.)
		type: Number
	},
	status: { // current status like active or cancelled
		type: String
	},
	
	// for a new subscription
	paymentDate: {
        type: Date,
		default: null
    },
	paymentStatus: {
		type: String,
		default: null
	},
	paidAmount :{
		type:Number
	},

	// when subscription is cancelled 
	refundId: {
		type: String,
		default:null
	},
	refundDate: {
        type: Date,
		default: null
    },
	refundStatus: {
		type: String,
		default:null
	},
	refundAmount:{
		type : Number,
		default: 0
	},

	
	
	
	
})

const PaymentDetail = mongoose.model('PaymentDetail', paymentDetailsSchema);

module.exports = PaymentDetail;
