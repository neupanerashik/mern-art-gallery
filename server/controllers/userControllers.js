import crypto from "crypto"
import cloudinary from "cloudinary"
import { Art } from '../models/artModel.js';
import { User } from '../models/userModel.js'
import { Chat } from '../models/chatModel.js';
import sendEmail from '../utility/sendEmail.js';
import { Message } from '../models/messageModel.js';
import ErrorHandler from '../utility/errorHandler.js'
import { Subscriber } from "../models/subscriberModel.js";
import catchAsyncError from '../utility/catchAsyncError.js'
import sendEmailFromSite from "../utility/sendEmailFromSite.js";

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
    const admin = await User.find({role: 'admin'});
    await Chat.create({participants: [admin[0]._id.toString(), user._id.toString()]});
    
    // set SameSite attribute to "none" for HTTPS, "lax" for HTTP
    const sameSite = req.secure ? 'none' : 'lax'; 
    res.cookie('jwt', token, {
        maxAge: 7*24*60*60*1000, 
        httpOnly: true, 
        sameSite: sameSite, 
        secure: req.secure,
        domain: 'localhost'
    });
    
    res.status(201).json({
        success: true,
        message: 'Successfully registered!',
        user
    });
});


// login user
export const loginUser = catchAsyncError(async (req, res, next) => {
    const {email, password, remember} = req.body 
    if(!email|| !password) return next(new ErrorHandler('The fields cannot be empty!', 409)); 
    const expiresIn = remember ? '30d': "7d";
    const user = await User.findOne({email}).select('+password').select('+confirmPassword');
    if(!user) return next(new ErrorHandler("Invalid email or password!", 400));
    const passwordMatch = await user.comparePassword(password);
    if(!passwordMatch) return next(new ErrorHandler("Invalid email or password!", 400));
    const token = await user.createJwtToken(expiresIn);

    // set SameSite attribute to "none" for HTTPS, "lax" for HTTP
    const sameSite = req.secure ? 'none' : 'lax'; 
    res.cookie('jwt', token, {
        maxAge: remember ? 30*24*60*60*1000 : 7*24*60*60*1000, 
        httpOnly: true, 
        sameSite: sameSite, 
        secure: req.secure,
        domain: 'localhost'
    });
	
    res.status(200).json({
        success: true,
        message: 'Successfully logged in!',
        user
    });
});


// logout user
export const logoutUser = catchAsyncError(async (req, res) => {
    // Node.js way
    // res.clearCookie('jwt');

    // Express way
    res.cookie("jwt", null, {maxAge: -1000, sameSite: "none", secure: true});

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

    const message = 
    `<div style="height: 100px; background-color: #f0f0f0; font-family: Times New Roman; color: black; text-align: center; padding: 25px; ">
        <p style="font-size: 16px;">Click on the button to reset the password.</p>
        <a href="http://localhost:3000/password/reset/${token}" 
            style="
            background-color: #4CAF50; 
            color: white; 
            padding: 10px 20px; 
            border: none; 
            cursor: pointer; 
            border-radius: 5px; 
            text-decoration: none;"
        >Click</a>
    </div>`;

    sendEmailFromSite({sender: process.env.EMAIL_ADDRESS, receiver: user.email, subject: "Password Reset", message});
    
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
    const {name, email, facebook, instagram, twitter, khaltiPublicKey, khaltiSecretKey} = req.body
    if(!name || !email) return next(new ErrorHandler("Name and email cannot be empty!", 400));
    const user = await User.findById(req.user.id);

    user.name = name;
    user.email = email;
    user.socials.facebook = facebook;
    user.socials.instagram = instagram;
    user.socials.twitter = twitter;
    user.donation.khalti.public_key = khaltiPublicKey;
    user.donation.khalti.secret_key = khaltiSecretKey;

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
    
    // delete arts and associated images
    arts.forEach(async (art) => {
        for(let i = 0; i < art.images.length; i++) {
            await cloudinary.v2.uploader.destroy(art.images[i].public_id)
        }
        await art.deleteOne();
    })


    // delete chat and message
    chats.forEach(async (chat) => {
        await Chat.findOneAndDelete({ _id: chat._id })
        await Message.deleteMany({chatId: chat._id})
    })    

    await user.deleteOne();

    res.status(200).json({
        success: true,
        message: 'Account deleted successfully.',
        user: {}
    });
});


// send mail from contact
export const sendMailFromContact = catchAsyncError(async (req, res, next) => {
    const {name, email, subject, message} = req.body;
    sendEmail({sender: email, receiver: process.env.EMAIL_ADDRESS, name, subject, message});

    res.status(200).json({
        success: true,
        message: `Email sent.`
    })
});


//subscribe
export const subscribe = async (req, res, next) => {
	try{
		const { email } = req.body;
		await Subscriber.create({email});

		res.status(201).json({
			success: true,
			message: 'Subscrption registered successfully!'
		});
	}
    catch(err){
		if (err.code == "11000")
			return next(new ErrorHandler("Email is already subscribed.", 400));
		else 
			return next(new ErrorHandler(err.message, err.code));
	}
}