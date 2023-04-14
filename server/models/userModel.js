import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
    name: {type: String, required: [true, 'Please enter your name!']},
    email: {type: String, required: [true, 'Please enter your email!'], validate: validator.isEmail},
    password: { type: String, required: [true, 'Please enter the password!'], minLength: [6, "Password should be at least six characters long!"], select: false},
    confirmPassword: {type: String, required: [true, "Please, enter the password again"], select: false},
    avatar: {public_id: {type: String}, url: {type: String}},
    role: {type: String},
    joinedAt: {type: Date, default: Date.now},
    socials: {facebook: {type: String, default: ""}, instagram: {type: String, default: ""}, twitter: {type: String, default: ""}},
    subscribed: {type: Boolean, default: false},
    likes: [{
        artId: {type: mongoose.Schema.Types.ObjectId, ref: 'Art', required: true},
        artName: {type: String, required: true},
        artPrice: {type: String, required: true},
        artImage: {type: String, required: true},
        artCategory: {type: String, required: true},
        artLikedOn: {type: Date, default: Date.now}
    }],
    donation: {
        khalti: {
            public_key: {type: String, default: ''},
            secret_key: {type: String, default: ''}
        }
    },
    subscribedAt: Date,
	passwordResetToken: String,
	passwordResetExpire: Date,
    
})

// hash password
userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) next();
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    this.confirmPassword = await bcrypt.hash(this.confirmPassword, salt);
    next();
})


//compare password
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}


// create jwt token
userSchema.methods.createJwtToken = function(expiresIn='7d'){
    return jwt.sign({_id: this._id}, process.env.JWT_SECRET_KEY, {expiresIn});
}


//create reset password token
userSchema.methods.createPasswordResetToken = async function (){
	const resetToken = crypto.randomBytes(20).toString('hex');
	this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
	this.passwordResetExpire = Date.now() + 5*60*1000;
	return resetToken;
}

export const User =  mongoose.model('User', userSchema);