import { Art } from "../models/artModel.js";
import { Order } from "../models/orderModel.js";
import { User } from "../models/userModel.js";
import catchAsyncError from "../utility/catchAsyncError.js";
import UserApiFeatures from "../utility/userApiFeatures.js";

export const getAllUsers = catchAsyncError(async (req, res, next) => {
    const features = new UserApiFeatures(User.find(), req.query).search();
    const users = await features.query;

    res.status(200).json({
        success: true,
        message: "Users fetched successfully!",
        users
    });
});

export const getStats = catchAsyncError(async (req, res, next) => {
    const totalUsers = await User.count();
    const totalArtworks = await Art.count();
    const totalOrders = await Order.count();
    const totalArtists = await User.count({role: {$in: ['painter', 'drawer', 'sculptor', 'photographer']}});

    const newUsers = await User.find({}, {name: 1, email: 1, role: 1, avatar: 1, joinedAt: 1}).sort({joinedAt: -1}).limit(5);
    const newOrders = await Order.find().sort({orderCreatedOn: -1}).limit(5);

    // total sales
    const orders = await Order.find();
    let totalSales = 0;
    orders.forEach(order => {totalSales = totalSales + order.orderSubtotal});

    // sales by category
    const totalSalesByCategory = orders.reduce((sales, order) => {
        order.orderItems.forEach(item => {
            if (['painting', 'drawing', 'sculpture', 'photography'].includes(item.artCategory)) {
            const category = item.artCategory;
            const price = Number(item.artPrice);
            sales[category] = (sales[category] || 0) + price;
            }
        });
        return sales;
    }, {});    
    
    // top sellers
    const allOrders = await Order.find().limit(10).populate('orderItems.artCreator');
    let topSellingArtists = allOrders.reduce((accumulator, order) => {
        order.orderItems.forEach((item) => {
            const { artCreator, artPrice }  = item;
            const artistId = artCreator._id.toString();

            if(!accumulator[artistId]){
                accumulator[artistId] = {artist: item.artCreator.name, role: item.artCreator.role, total_sales: 0}
            }

            accumulator[artistId].total_sales += parseInt(artPrice);
        });

        return accumulator;
    }, {})

    topSellingArtists = Object.values(topSellingArtists).sort((a, b) => b.total_sales - a.total_sales);

    res.status(200).json({
        totalUsers,
        totalArtworks,
        totalOrders,
        totalArtists,
        newUsers,
        newOrders,
        totalSales,
        totalSalesByCategory,
        topSellingArtists
    });
})