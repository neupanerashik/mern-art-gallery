import catchAsyncError from '../utility/catchAsyncError.js'
import ErrorHandler from '../utility/errorHandler.js'
import sendEmail from '../utility/sendEmail.js';
import cloudinary from "cloudinary"
import crypto from "crypto"
import { User } from '../models/userModel.js'
import { Product } from '../models/productModel.js';


// register user
export const registerUser = catchAsyncError(async (req, res, next) => {
    const {name, email, password, confirmPassword, role} = req.body;
    if(password !== confirmPassword) return next(new ErrorHandler('Password do not match.', 400));
    if(name === '' || email === '' || password === '' || confirmPassword === '') return next(new ErrorHandler('The fields cannot be empty', 409)); 
    const isEmailUsed = await User.findOne({email});
    if (isEmailUsed) return next(new ErrorHandler("Email is already used!", 400));
    const user = await User.create({name, email, password, confirmPassword, role});
    const token = await user.createJwtToken();
	
    res.cookie('jwt', token, {maxAge: 7*24*60*60*1000, httpOnly: true, sameSite: true}); //{secure: true}
    res.status(201).json({
        success: true,
        message: 'Successfully registered!',
        user
    });
});


// login user
export const loginUser = catchAsyncError(async (req, res, next) => {
    const {email, password, remember} = req.body 
    const expiresIn = remember ? '30d': "7d";
    if(!email|| !password) return next(new ErrorHandler('The fields cannot be empty!', 409)); 
    const user = await User.findOne({email}).select('+password').select('+confirmPassword');
    if(!user) return next(new ErrorHandler("Invalid email or password!", 400));
    const passwordMatch = await user.comparePassword(password);
    if(!passwordMatch) return next(new ErrorHandler("Invalid email or password!", 400));
    const token = await user.createJwtToken(expiresIn);
	
    res.cookie('jwt', token, {maxAge: remember ? 7*24*60*60*1000 : 7*24*60*60*1000, httpOnly: true, sameSite: true}); //{secure: true}
    res.status(200).json({
        success: true,
        message: 'Successfully logged in!',
        user
    });
});


// logout user
export const logoutUser = catchAsyncError(async (req, res) => {
    res.cookie("jwt", null, {maxAge: -1000})
	res.status(200).send({
		success: true,
		message: "Successfully logged out!"
	});
});


// get profile
export const getProfile = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id);

    res.status(200).json({
        success: true,
        user
    });
});


// update password
export const updatePassword = catchAsyncError(async (req, res, next) => {
	const {oldPassword, newPassword} = req.body;
    if(!oldPassword || !newPassword) return next(new ErrorHandler("Please, enter all the fields!", 400));
    const user = await User.findById(req.user.id).select('+password').select('+confirmPassword');
    const passwordMatch = await user.comparePassword(oldPassword);
    if(!passwordMatch) return next(new ErrorHandler('Old password is incorrect.', 400))
   
    user.password = newPassword;
    user.confirmPassword = newPassword; 
    await user.save();

    res.status(200).json({
        success: true,
        message: 'Password updated successfully!',
    });
});


// forget password
export const forgetPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({email: req.body.email});
    if(!user) return next(new ErrorHandler('User not found!', 404));
    const token = await user.createPasswordResetToken();
    await user.save({validateBeforeSave: false});

    // const passwordResetUrl = `${req.protocol}://${req.get('host')}/password/reset/${token}`;
    const passwordResetUrl = `http://localhost:3000/password/reset/${token}`;
    const message = `Click on the given link to reset password: ${passwordResetUrl}`;
    sendEmail({email: user.email, subject: "Password Reset", message});
    
    res.status(200).json({
        success: true,
        message: `Email sent to ${user.email}`
    })
});


//reset password
export const resetPassword = catchAsyncError(async (req, res, next) => {
    const passwordResetToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({passwordResetToken, passwordResetExpire: {$gt: Date.now()}})
    if(!user) return next(new ErrorHandler('Token expired!', 401))
    if(req.body.password != req.body.confirmPassword) return next(new ErrorHandler('Password do not match', 400))
    
    user.password = req.body.password;
    user.confirmPassword = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpire = undefined;  
    await user.save();

    res.status(200).json({
        success: true,
        message: 'Password reset successfully!',
    });
});


// update profile
export const updateProfile = catchAsyncError(async (req, res, next) => {
    const {name, email, avatar} = req.body
    const user = await User.findById(req.user.id);
    
    if(name) user.name = name;
    if(email) user.email = email;
    if (avatar) {
        const result = await cloudinary.uploader.upload('/VisArt/Avatar', options);
    }
    await user.save();

    res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
    });
});


// add to likes
export const addToLikes = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    const product = await Product.findById(req.body.id);
    if(!product) return next(new ErrorHandler("Product not found!", 404));
    const isLiked = user.likes.find(like => like.productId.toString() === req.body.id.toString());
    if(isLiked) return next(new ErrorHandler("Already liked!", 409));
    user.likes.push({id: req.body.id})
    await user.save();

    res.status(201).json({
        success: true,
        message: 'Product added to likes.'
    });
});


// remove from likes
export const removeFromLikes = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    const product = await Product.findById(req.body.id);
    if(!product) return next(new ErrorHandler("Product not found!", 404));
    const newLikes = user.likes.filter(like => like.productId.toString() !== req.body.id.toString());
    user.likes = newLikes;
    await user.save();

    res.status(201).json({
        success: true,
        message: 'Product added to likes.'
    });
});

//subscriber
export const subscribe = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    user.subscribed = !user.subscribed;
    user.subscribedAt = Date.now();
    await user.save();

    res.status(200).json({
        success: true,
        message: 'Subscribed successfully. You will now receive notifications on your email directly!'
    });
});


//subscriber
export const unsubscribe = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    user.subscribed = !user.subscribed;
    user.subscribedAt = undefined;
    await user.save();

    res.status(200).json({
        success: true,
        message: 'Unubscribed successfully. You will not receive notifications on your email from now on!'
    });
});

	

