import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {type: String, required: [true, "Please, enter the name!"]},
	price: {type: Number, required: [true, "Please, enter the price!"]},
	description: {type: String, required: [true, "Please, enter the description!"]},
	category: {type: String, required: [true, "Please, enter the product category!"]},
	images: [{
		original_image_public_id: {type: String, required: true}, 
		original_image_url: {type: String, required: true},
		watermarked_image_public_id: {type: String, required: true}, 
		watermarked_image_url: {type: String, required: true}
	}],
	creator: {type: mongoose.Schema.ObjectId, ref: 'User', required: true},
	uploadedAt: {type: Date, default: Date.now},
	reviews: [{
        reviewerId: {type: mongoose.Schema.ObjectId, ref: 'User', required: true}, 
        reviewerName: {type: String, required: true}, 
        rating: {type: Number, required: true}, 
        comment: String,
		reviewedOn: {type: Date, default: Date.now}
    }],
	bids: [{
		bidder: {type: mongoose.Schema.ObjectId, ref: 'User', required: true},
        bidAmount: {type: Number, required: true}, 
        bidPlacedOn: {type: Date, default: Date.now}
    }],
	averageRating: {type: Number, default: 0},
	discount: {type: Number, default: null},
	isAuctionItem: {type: Boolean, default: false},
	estimatedValueFrom: {type: Number},
	estimatedValueTo: {type: Number},
	endDate: {type: String},
	artStatus: {type: String, default: "unsold"}
});

export const Art = mongoose.model("Art", schema);
