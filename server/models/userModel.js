import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from 'crypto';

const schema = new mongoose.Schema({
    name: {type: String, required: [true, 'Please enter your name!']},
    email: {type: String, required: [true, 'Please enter your email!'], validate: validator.isEmail},
    password: { type: String, required: [true, 'Please enter the password!'], minLength: [6, "Password should be at least six characters long!"], select: false},
    confirmPassword: {type: String, required: [true, "Please, enter the password again"], select: false},
    avatar: {public_id: {type: String}, url: {type: String}},
    likes: [{productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}],
    role: {type: String, default: 'user'},
    joinedAt: {type: Date, default: Date.now},
    subscribed: {type: Boolean, default: false},
    subscribedAt: Date,
	passwordResetToken: String,
	passwordResetExpire: Date,
})

schema.pre('save', async function(next) {
    if(!this.isModified('password')) next();

    // hashing the password
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    this.confirmPassword = await bcrypt.hash(this.confirmPassword, salt);
    next();
})

// create jwt token
schema.methods.createJwtToken = function(expiresIn='7d'){
    return jwt.sign({_id: this._id}, process.env.JWT_SECRET_KEY, {expiresIn});
}

//compare password
schema.methods.comparePassword = async function(password){
	return await bcrypt.compare(password, this.password);
}

//create reset password token
schema.methods.createPasswordResetToken = async function (){
	const resetToken = crypto.randomBytes(20).toString('hex');
	this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
	this.passwordResetExpire = Date.now() + 5*60*1000;
	return resetToken;
}

export const User =  mongoose.model('User', schema);