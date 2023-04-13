import path from 'path';
import cloudinary from 'cloudinary'
import { Art } from "../models/artModel.js";
import { User } from "../models/userModel.js";
import { getDataUri } from "../utility/getDataUri.js";
import catchAsyncError from "../utility/catchAsyncError.js";
import ErrorHandler from "../utility/errorHandler.js";
import ArtApiFeatures from "../utility/artApiFeatures.js";


// create art
export const createArt = catchAsyncError(async (req, res, next) => {
    const { name, price, description, category, estimatedValueFrom, estimatedValueTo, endDate, isAuctionItem} = req.body;
    if (!name|| !description || !category) return next(new ErrorHandler("Please enter all the required fields.", 400));
    if (isAuctionItem === true && (!estimatedValueFrom || !estimatedValueTo || !endDate)) {return next(new ErrorHandler("Please enter all the required fields for auction item.", 400))}
    if (price === 0) return next(new ErrorHandler("Price cannot be zero!.", 400));

    req.body.creator = req.user.id;
    let artImages = req.files;
    let artImagesLinks = [];

    // creator
    const user = await User.findById(req.user.id);

    if(artImages[0]){
        for (const image of artImages) {
            try {
                const imageUri = getDataUri(image);
                const result = await cloudinary.v2.uploader.upload(imageUri, {folder: 'VisArt/Arts', transformation: [{ 
                    effect: 'overlay', 
                    overlay: {
                        font_family: "Verdana", 
                        font_size: 100, 
                        font_weight: "bold", 
                        text: `Vis Art - ${user.name}`
                    },
                    gravity: 'south_west', 
                    opacity: 80, 
                    flags: 'relative' 
                }]});
               
                artImagesLinks.push({ public_id: result.public_id, url: result.secure_url });
            } catch (error) {
                return next(new ErrorHandler(error.message, 500));
            }
        }

        req.body.images = artImagesLinks;
    }

    const art = await Art.create(req.body);

    res.status(201).json({
        success: true,
        message: "Product uploaded successfully!",
        art
    });
});


// read all products
export const readArts = catchAsyncError(async (req, res, next) => {
    const features = new ArtApiFeatures(Art.find(), req.query).search().sort().filterByPrice().limitFields();
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
        await cloudinary.v2.uploader.destroy(art.images[i].public_id);
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
    const art = await Art.findById(artId);
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

    if(!bidAmount || bidAmount === '') return next(new ErrorHandler(`Please provide bidding amount.`));
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