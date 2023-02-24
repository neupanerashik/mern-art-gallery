import catchAsyncError from '../utility/catchAsyncError.js'
import ErrorHandler from '../utility/errorHandler.js'
import sendEmail from '../utility/sendEmail.js';
import cloudinary from "cloudinary"
import crypto from "crypto"
import { User } from '../models/userModel.js'
import { Art } from '../models/artModel.js';
import { Chat } from '../models/chatModel.js';
import { Message } from '../models/messageModel.js';


// register user
export const registerUser = catchAsyncError(async (req, res, next) => {
    const {name, email, password, confirmPassword, role} = req.body;
    const normalizedRole = role || "user";
    if(password !== confirmPassword) return next(new ErrorHandler('Password do not match.', 400));
    if(name === '' || email === '' || password === '' || confirmPassword === '') return next(new ErrorHandler('The fields cannot be empty', 409)); 
    const isEmailUsed = await User.findOne({email});
    if (isEmailUsed) return next(new ErrorHandler("Email is already used!", 400));
    const user = await User.create({name, email, password, confirmPassword, role: normalizedRole});
    const token = await user.createJwtToken();
    
     // create chat
    const customerServiceRep = await User.find({role: 'csr'});
    await Chat.create({participants: [customerServiceRep[0]._id.toString(), user._id.toString()]});

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
	
    res.cookie('jwt', token, {maxAge: remember ? 30*24*60*60*1000 : 7*24*60*60*1000, httpOnly: true, sameSite: true}); //{secure: true}
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


// get my profile
export const getMyProfile = catchAsyncError(async (req, res, next) => {
    const user = await User.findById({_id: req.user.id});

    res.status(200).json({
        success: true,
        user
    });
});

// get user profile
export const getUserProfile = catchAsyncError(async (req, res, next) => {
    const user = await User.findById({_id: req.params.id})

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
    sendEmail({sender: process.env.EMAIL_ADDRESS, receiver: user.email, subject: "Password Reset", message});
    
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
    const {name, email, facebook, instagram, twitter} = req.body
    const user = await User.findById(req.user.id);
    if(!name || !email) return next(new ErrorHandler("Name and email cannot be empty!", 400));

    user.name = name;
    user.email = email;
    user.socials.facebook = facebook;
    user.socials.instagram = instagram;
    user.socials.twitter = twitter;

    await user.save();

    res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        user
    });
});


// update avatar
export const updateAvatar = catchAsyncError(async (req, res, next) => {
    const {avatar} = req.body
    const user = await User.findById(req.user.id);
 
    if(!user.avatar.public_id && !user.avatar.url){
        const {public_id, secure_url} = await cloudinary.v2.uploader.upload(avatar, {folder: 'VisArt/Avatars'});
        user.avatar.public_id = public_id;
        user.avatar.url = secure_url;
    }else{
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);
        const {public_id, secure_url} = await cloudinary.v2.uploader.upload(avatar, {folder: 'VisArt/Avatars'});       
        user.avatar.public_id = public_id;
        user.avatar.url = secure_url;
    }    

    await user.save();

    res.status(200).json({
        success: true,
        message: 'Profile picture updated successfully',
        user
    });
});


// delete account
export const deleteAccount = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id)
    const arts = await Art.find({creator: req.params.id})
    const chats = await Chat.find({ participants: req.params.id })

    // delete avatar
    if(user.avatar.public_id && user.avatar.url){await cloudinary.v2.uploader.destroy(user.avatar.public_id);}
    
    // image arts images
    arts.forEach(async (art) => {
        for(let i = 0; i < art.images.length; i++) {await cloudinary.v2.uploader.destroy(art.images[i].public_id)}
    })

    // delete chat and message
    chats.forEach(async (chat) => {
        await Chat.findOneAndDelete({ _id: chat._id })
        await Message.deleteMany({chatId: chat._id})
    })

    // delete messages
    

    await user.deleteOne();

    res.status(200).json({
        success: true,
        message: 'Account deleted successfully.',
        user: {}
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


// send mail from contact
export const sendMailFromContact = catchAsyncError(async (req, res, next) => {
    const {name, email, subject, message} = req.body;
    console

    sendEmail({sender: email, receiver: process.env.EMAIL_ADDRESS, name, subject, message});

    res.status(200).json({
        success: true,
        message: `Email sent.`
    })
});

