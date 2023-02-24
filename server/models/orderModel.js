import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
	shippingInfo: {
		name: {type: String, required: true},
		address_line1: {type: String, required: true},
		address_line2: {type: String},
		phone: {type: Number, required: true},
		email: {type: String},
		city: {type: String, required: true},
		province: {type: String,required: true}
	},

	orderItems: [
		{
			id: {
				type: mongoose.Schema.ObjectId,
				ref: "Product",
				required: true
			},
			name: {
				type: String,
				required: true
			},
			price: {
				type: String,
				required: true
			},
			quantity: {
				type: String,
				required: true
			},
			category: {
				type: String,
				required: true
			},
			image: {
				type: String,
				required: true
			}
		}
	],

	orderedBy: {
		type: mongoose.Schema.ObjectId,
		ref: "User",
		required: true
	},

	paymentInfo: {
		id: {
			type: String,
			required: true
		},
		status: {
			type: String,
			required: true
		}
	},

	paidAt: {
		type: Date,
		required: true
	},

	itemsPrice: {
		type: Number,
		required: true,
		default: 0
	},

	taxPrice: {
		type: Number,
		required: true,
		default: 0
	},

	shippingPrice: {
		type: Number,
		required: true,
		default: 0
	},

	totalPrice: {
		type: Number,
		required: true,
		default: 0
	},

	orderStatus: {
		type: String,
		required: true,
		default: "processing"
	},

	deliveredAt: {
		type: Date
	},
	
	createdAt: {
		type: Date,
		default: Date.now
	}
})


//exporting module
module.exports = mongoose.model('Order', orderSchema);