import fs from 'fs';
import url from 'url';
import path from 'path';
import sharp from 'sharp';
import cloudinary from 'cloudinary'
import { Art } from "../models/artModel.js";
import { User } from "../models/userModel.js";
import catchAsyncError from "../utility/catchAsyncError.js";
import ErrorHandler from "../utility/errorHandler.js";
import ArtApiFeatures from "../utility/artApiFeatures.js";


// configuring __filename and __dirname in ES Module
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// create art
export const createArt = catchAsyncError(async (req, res, next) => {
    const { name, price, description, category, estimatedValueFrom, estimatedValueTo, endDate, isAuctionItem} = req.body;
    if (!name|| !price || !description || !category) return next(new ErrorHandler("Please enter all the required fields.", 400));
    if (isAuctionItem === true && (!estimatedValueFrom || !estimatedValueTo || !endDate)) {return next(new ErrorHandler("Please enter all the required fields for auction item.", 400))}
    if (price === 0) return next(new ErrorHandler("Price cannot be zero!.", 400));

    req.body.creator = req.user.id;
    let artImages = req.files;
    let artImagesLinks = [];

    // watermark image
    const watermarkImagePath = path.join(__dirname, '..', 'assets', 'logo.png');
    const watermarkImageBuffer = await fs.promises.readFile(watermarkImagePath);

    if(artImages[0]){
        for (const image of artImages) {
            try {
                const extname = image.originalname.split(".")[1];
                const watermarkedImage = await sharp(image.buffer).composite([{input: watermarkImageBuffer, gravity: 'southwest'}]).toBuffer();

                const originalImageUri = `data:image/${extname};base64,${image.buffer.toString("base64")}`;
                const watermarkedImageUri = `data:image/${extname};base64,${watermarkedImage.toString("base64")}`;
                
                const originalImageResult = await cloudinary.v2.uploader.upload(originalImageUri, {folder: 'VisArt/Arts'});
                const watermarkedImageResult = await cloudinary.v2.uploader.upload(watermarkedImageUri, {folder: 'VisArt/Arts'});

                artImagesLinks.push({ 
                    original_image_public_id: originalImageResult.public_id,
                    original_image_url: originalImageResult.secure_url, 
                    watermarked_image_public_id: watermarkedImageResult.public_id,
                    watermarked_image_url: watermarkedImageResult.secure_url,
                });
            } catch (error) {
                return next(new ErrorHandler(error.message, 500));
            }
        }

        req.body.images = artImagesLinks;
    }

    const art = await Art.create(req.body);

    res.status(201).json({
        success: true,
        message: "Artwork uploaded successfully!",
        art
    });
});


// read all products
export const readArts = catchAsyncError(async (req, res, next) => {
    const features = new ArtApiFeatures(Art.find(), req.query).search().sort().filterByPrice();
    const arts = await features.query;

    res.status(200).json({
        success: true,
        message: "Arts fetched successfully!",
        arts
    });
});


// read specific product
export const readArt = catchAsyncError(async (req, res, next) => {
    const artwork = await Art.findById(req.params.id);
    if(!artwork) return next(new ErrorHandler('Art not found!', 404));

    res.status(200).json({
        success: true,
        message: "Product detail fetched successfully!",
        artwork	
    });
});


// recommendated arts
export const getRecommendations = catchAsyncError(async (req, res, next) => {
    const newArrivals = await Art.find().sort({uploadedAt: -1});
    const highestRated = await Art.find().sort({averageRating: -1});
    const specialOffers = await Art.find().sort({discount: -1});

    res.status(200).json({
        success: true,
        newArrivals,
        highestRated,
        specialOffers,
        message: 'Arts fetched successfully'
    })
});


// update art
export const updateArt = catchAsyncError(async (req, res, next) => {

    let art = await Art.findById(req.params.id)
    if(!art) {return next(new ErrorHandler('Artwork not found.', 404))}
    req.body.creator = req.user.id;		
	art = await Art.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true, useFindAndModify: false});

    res.status(200).json({
        success: true,
        art,
    });
});


// delete art
export const deleteArt = catchAsyncError(async (req, res, next) => {
    const art = await Art.findById(req.params.id);
    if(!art) return next(new ErrorHandler('Artwork not found!', 404));

    // image delete logic
    for (let i = 0; i < art.images.length; i++) {
        await cloudinary.v2.uploader.destroy(art.images[i].original_image_public_id);
        await cloudinary.v2.uploader.destroy(art.images[i].watermarked_image_public_id);

    }

    await art.deleteOne();

    res.status(200).json({
        success: true,
        message: 'Artwork deleted successfully!',
        art
    });
});


// create review
export const createReview = catchAsyncError(async (req, res, next) => {
    const {rating, comment, id} = req.body;
    const art = await Art.findById(id);
    const isReviewed = art.reviews.find(rev => rev.reviewerId.toString() === req.user._id.toString());

    if(!isReviewed){
        art.reviews.push({
            reviewerId: req.user._id, 
            reviewerName: req.user.name, 
            rating: Number(rating), 
            comment: comment,
        });
    }else{
        art.reviews.forEach(rev => {
            if(rev.reviewerId.toString() === req.user._id.toString()){
                rev.rating = rating;
				rev.comment = comment;
            }
        })
    }

    let totalRating = 0;
    const numOfReviews = art.reviews.length;
    art.reviews.forEach(rev => totalRating = totalRating + rev.rating);
    art.averageRating = totalRating/numOfReviews;
    await art.save({validateBeforeSave: false});

    res.status(200).json({
        success: true,
        message: "Review sent successfully!"
    })
});



//get reviews
export const getReviews = catchAsyncError(async (req, res, next)=> {
    const art = await Art.findById(req.params.id);
    if(!art){return next(new ErrorHandler('Artwork not found!', 404))};

    res.status(200).json({
        success: true,
        reviews: art.reviews,
        averageRating: art.averageRating,
        message: "Reviews retrieved successfully."
    })
});


// delete review
export const deleteReview = catchAsyncError(async (req, res, next) => {
    const {id} = req.body.params;
    const art = await Art.findById(id);
    const reviews = art.reviews.filter((rev) => rev.reviewerId.toString() !== req.user._id.toString());

    //averag rating
    let totalRating = 0;
    const numOfReviews = art.reviews.length;
    art.reviews.forEach(rev => totalRating = totalRating + rev.rating);
    art.averageRating = totalRating/numOfReviews;

    await Art.save();

    res.status(200).json({
        success: true,
        message: "Review deleted successfully!"
    })
});


// get my products
export const getUserArtworks = catchAsyncError(async (req, res, next) => {
    const userArtworks = await Art.find({creator: req.params.id});
    
    res.status(200).json({
        success: true,
        message: "Read all my products!",
        userArtworks
    })
})


// add to likes
export const addToLikes = catchAsyncError(async (req, res, next) => {
    const {artId, artName, artPrice, artCategory, artImage} = req.body;
    const user = await User.findById(req.user.id);
    const isLiked = user.likes.find(like => like.artId.toString() === artId.toString());
    if(isLiked) return next(new ErrorHandler("Already liked!", 409));

    user.likes.push({artId, artName, artPrice, artCategory, artImage});
    await user.save();

    res.status(201).json({
        success: true,
        message: 'Art added to likes.',
        user
    });
});


// remove from likes
export const removeFromLikes = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    const art = await Art.findById(req.body.artId);
    if(!art) return next(new ErrorHandler("Artwork not found!", 404));
    const newLikes = user.likes.filter(like => like.artId.toString() !== req.body.artId.toString());
    user.likes = newLikes;
    await user.save();

    res.status(200).json({
        success: true,
        message: 'Art removed from likes.',
        user
    });
});


// place bid
export const placeBid = catchAsyncError(async (req, res, next) => {
    const {bidAmount, artId, bidder} = req.body;
    const art = await Art.findById(artId);

    if(bidder === art.creator.toString()) return next(new ErrorHandler(`You cannot bid on your own auction.`));
    if(!bidAmount || bidAmount === '') return next(new ErrorHandler(`Please provide bidding amount.`));
    if(bidAmount <= art.estimatedValueFrom) return next(new ErrorHandler(`The bidding price should be bigger than the lower estimated value of Rs ${art.estimatedValueFrom}`));
    
    const highestBid = art.bids.reduce((prevBid, currBid) => {return (prevBid.bidAmount > currBid.bidAmount) ? prevBid : currBid}, {});
    if (bidAmount <= highestBid.bidAmount) return next(new ErrorHandler(`Bidding amount must be higher than current bid of Rs ${highestBid.bidAmount}`, 404));
    const hasPlacedBid = art.bids.find(bid => bid.bidder.toString() === req.user._id.toString());

    if(!hasPlacedBid){
        art.bids.push({bidder, bidAmount});
    }else{
        art.bids.forEach(bid => {
            if(bid.bidder.toString() === req.user._id.toString()){
                bid.bidAmount = bidAmount;
            }
        })
    }

    await art.save({validateBeforeSave: false});

    res.status(201).json({
        success: true,
        message: 'Bid placed successfully.',
        art
    });
})


// find highest bidder
export const findHighestBidder = catchAsyncError(async (req, res, next) => {
    const { artId } = req.query;
    const art = Art.findById(artId);

    if(!art) return next(new ErrorHandler("Artwork not found."));
    const highestBid = art.bids.reduce((acc, bid) => {
        if (bid.bidAmount > acc.bidAmount) {
            return bid;
        }
        return acc;
    }, art.bids[0]);

    const highestBidder = await User.findById(highestBid.bidder);
    const artOwner = await User.findById(art.creator); 

    // send email to winner
    const winnerMessage = `Congratulations ${highestBidder.name}. You are the winner of the auction of the art titled ${art.name} with the bidding amount of ${highestBid.bidAmount}.\n
    You will be notified of further acqirement procedure very shortly. You can also contact art owner in the email address ${artOwner.email} for more information.`;
    sendEmailFromSite({sender: process.env.EMAIL_ADDRESS, receiver: highestBidder.email, subject: "Announcement of bid winner", message: winnerMessage});

    // send email to owner
    const ownerMessage = `Hello ${artOwner.name}. Your artwork titled ${art.name} has been auctioned successfully with the highest bidding price of ${highestBid.bidAmount} from ${highestBidder.name}.\n
    You can contact auction winner with this email ${highestBidder.email} and proceed for further steps. Thank you!`;
    sendEmailFromSite({sender: process.env.EMAIL_ADDRESS, receiver: artOwner.email, subject: "Announcement of bid winner", message: ownerMessage});

    // Update artStatus of all orderItems to 'sold'
    await Art.updateOne({_id: art._id}, {artStatus: 'sold'});
});