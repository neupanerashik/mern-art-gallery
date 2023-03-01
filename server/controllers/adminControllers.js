import { User } from "../models/userModel.js";
import catchAsyncError from "../utility/catchAsyncError.js";
import UserApiFeatures from "../utility/userApiFeatures.js";

export const getUsers = catchAsyncError(async (req, res, next) => {
    const features = new UserApiFeatures(User.find(), req.query).search();
    const users = await features.query;

    res.status(200).json({
        success: true,
        message: "Users fetched successfully!",
        users
    });
});