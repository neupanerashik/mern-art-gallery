import jwt from 'jsonwebtoken';
import ErrorHandler from '../utility/errorHandler.js';
import catchAsyncError from '../utility/catchAsyncError.js';
import { User } from '../models/userModel.js';

// is authendicated or not
export const isAuthenticated = catchAsyncError(async (req, res, next) => {
	const token = req.cookies.jwt;
	if(!token) return next(new ErrorHandler('Please login first!', 401));
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
	req.user = await User.findById(decodedToken._id);
    next();
})


//middleware to authenticate creator
const creatorRoles = ["painter", "drawer", "sculptor", "photographer", "admin", "editor"]

export const isCreator = (req, res, next) => {
	if (!creatorRoles.includes(req.user.role)) {return next(new ErrorHandler(`${req.user.role} cannot access this resource.`, 403));}
	next();
}
  

//middleware to check the role of user
export const isAdmin = (req, res, next) => {
	if (req.user.role !== "admin") {return next(new ErrorHandler("Only admin can access this resource!", 403))}
	next();
}
  
