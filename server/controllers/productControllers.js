import { Product } from "../models/productModel.js";
import catchAsyncError from "../utility/catchAsyncError.js";
import ErrorHandler from "../utility/errorHandler.js";


// get all products
export const getAllProducts = catchAsyncError(async (req, res, next) => {
    const products = await Product.find();

    res.status(200).json({
        success: true,
        message: "Products fetched successfully!",
        products
    });
});


// get product detail
export const readProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if(!product) return next(new ErrorHandler('Product not found!', 404));

    res.status(200).json({
        success: true,
        message: "Product detail fetched successfully!",
        product	
    });
});


// upload product
export const createProduct = catchAsyncError(async (req, res, next) => {
    const {name, price, description, category, images, stock, creator, dicount} = req.body; //creator = id of creator
    if(!name || !price || !description || !category || creator) return next(new ErrorHandler("Please enter all the required fields.", 40000));

    // upload image logic

    const product = await Product.create({name, price, description, category, images, stock, creator, dicount});

    res.status(201).json({
        success: true,
        message: "Products uploaded successfully!",
        product
    });
});


// delete product
export const deleteProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if(!product) return next(new ErrorHandler('Product not found!', 404));

    // image delete logic
    // for (let i = 0; i < product.images.length; i++) {
    //     await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    // }

    await product.deleteOne();

    res.status(200).json({
        success: true,
        message: 'Product deleted successfully!',
    });
});


// update product
export const updateProduct = catchAsyncError(async (req, res, next) => {

    res.status(200).json({
        success: true,
        product,
    });
});


// create review
export const createReview = catchAsyncError(async (req, res, next) => {
    const {rating, comment} = req.body;
    const {id} = req.params.id;
    const product = await Product.findById(id);
    const isReviewed = product.reviews.find(rev => rev.reviewerId.toString() === req.user._id.toString());

    if(!isReviewed){
        product.reviews.push({
            reviewerId: req.user._id, 
            name: req.user.name, 
            rating: Number(rating), 
            comment
        });
    }else{
        product.reviews.forEach(rev => {
            if(rev.reviewerId.toString() === req.user._id.toString()){
                rev.rating = rating;
				rev.comment = comment;
            }
        })
    }

    let totalRating = 0;
    const numOfReviews = product.reviews.length;
    product.reviews.forEach(rev => totalRating = totalRating + rev.rating);
    product.averageRating = totalRating/numOfReviews;
    await product.save({validateBeforeSave: false});

    res.status(200).json({
        success: true,
        message: "Review sent successfully!"
    })
});


// delete review
export const deleteReview = catchAsyncError(async (req, res, next) => {
    const {id} = req.body.params;
    const product = await Product.findById(id);
    const reviews = product.reviews.filter((rev) => rev.reviewerId.toString() !== req.user._id.toString());

    //averag rating
    let totalRating = 0;
    const numOfReviews = product.reviews.length;
    product.reviews.forEach(rev => totalRating = totalRating + rev.rating);
    product.averageRating = totalRating/numOfReviews;

    await Product.save();

    res.status(200).json({
        success: true,
        reviews: "Review deleted successfully!"
    })
});

