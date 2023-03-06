import { Order } from "../models/orderModel.js";
import { Art } from "../models/artModel.js";
import ErrorHandler from "../utility/errorHandler.js";
import catchAsyncError from "../utility/catchAsyncError.js";

//create new order
export const newOrder = catchAsyncError(async(req, res, next) => {
    const {shippingDetail, orderItems, paymentDetail, orderSubtotal, taxPrice, shippingPrice, orderTotal} = req.body.orderData;
    
    const order = await Order.create({
        shippingDetail, 
        orderItems, 
        paymentDetail, 
        orderSubtotal,  
        taxPrice, 
        shippingPrice, 
        orderTotal, 
        paidOn: Date.now(), 
        orderedBy: req.user._id
    })

    // Update artStatus of all orderItems to 'sold'
    const orderItemIds = order.orderItems.map(item => item.artId);
    await Art.updateMany({_id: {$in: orderItemIds}}, {artStatus: 'sold'});

    res.status(201).json({
        success: true,
        message: "Order placed successfully.",
        order
    })
}) 


//get all orders 
export const getAllOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find();
    
    let totalSales = 0;
    orders.forEach(order => {totalSales = totalSales + order.orderSubtotal})
    
    res.status(200).json({
        success: true,
        totalSales,
        orders
    })
})


//delete order
export const deleteOrder = catchAsyncError (async(req, res, next) => {
    const order = await Order.findById(req.params.id)

    if(!order){return next(new ErrorHandler("Order does not exist", 404))}

    await order.remove()
    
    res.status(200).json({
        success: true,
        message: 'Order deleted successfully',
        order
    })
})


// get my orders
export const getOrdersMade = catchAsyncError( async(req, res, next) => {
    const ordersMade = await Order.find({orderedBy: req.user._id})

    res.status(200).json({
        success: true,
        ordersMade
    })
})


export const getOrdersReceived = catchAsyncError( async(req, res, next) => {
    const arts = await Art.find({creator: req.user._id});
    const myArts = arts.map(art => art._id);
    const ordersReceived = await Order.find({ 'orderItems.artId': { $in: myArts } });


    res.status(200).json({
        success: true,
        ordersReceived
    })
})


// update order
export const updateOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if(!order){return next(new ErrorHandler("Order does not exist", 404))}
    if(req.body.orderStatus === '') {return next(new ErrorHandler("Invalid order status.", 404))}
    if(order.orderStatus === "delivered"){return next(new ErrorHandler('The order has already been delivered', 400))}

    order.orderStatus = req.body.orderStatus;

    if(req.body.orderStatus === 'shipped'){
        order.shippedOn = Date.now();
    }

    if(req.body.orderStatus === 'delivered'){
        order.deliveredOn = Date.now();
    }

    await order.save({validateBeforeSave: false})

    res.status(200).json({
        success: true,
        message: 'Order updated successfully'
    })
})


