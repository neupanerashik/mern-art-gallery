import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
	orderCreatedOn: {type: Date, default: Date.now},
	shippingDetail: {
		name: {type: String, required: true},
		phone: {type: Number, required: true},
		email: {type: String},
		city: {type: String, required: true},
		province: {type: String,required: true},
		address: {type: String, required: true},
	},

	orderItems: [
		{
			artId: {type: mongoose.Schema.ObjectId,ref: "Art",required: true},
			artName: {type: String, required: true},
			artPrice: {type: String, required: true},
			artCategory: {type: String, required: true},
			artImage: {type: String, required: true},
			artCreator: {type: mongoose.Schema.ObjectId,ref: "User",required: true},
		}
	],

	orderedBy: {type: mongoose.Schema.ObjectId, ref: "User", required: true},

	paymentDetail: {
		id: {type: String, required: true},
		status: {type: String, required: true}
	},

	paidOn: {type: Date, required: true},
	orderSubtotal: {type: Number,required: true, default: 0},
	taxPrice: {type: Number, required: true, default: 0},
	shippingPrice: {type: Number, required: true, default: 0},
	orderTotal: {type: Number, required: true, default: 0},
	orderStatus: {type: String, required: true, default: "processing"},
	shippedOn: {type: Date},
	deliveredOn: {type: Date},
})


//exporting module
export const Order = mongoose.model('Order', orderSchema);