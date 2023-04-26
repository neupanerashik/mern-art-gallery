import moment from 'moment';
import { Art } from "../models/artModel.js";
import { Order } from "../models/orderModel.js";
import ErrorHandler from "../utility/errorHandler.js";
import catchAsyncError from "../utility/catchAsyncError.js";
import sendEmailFromSite from "../utility/sendEmailFromSite.js";

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

     // send download link for images
    for (const item of orderItems) {
        if (item.artCategory === "photography") {
            const art = await Art.findById(item.artId);
            const message = `Your order #${order._id} has been placed successfully. Thank you for buying art from us. You can download your image from this link:\n${art.images[0].original_image_url}`;
            sendEmailFromSite({sender: process.env.EMAIL_ADDRESS, receiver: shippingDetail.email, subject: "Photography Art Download Link", message});
        }
    }

    res.status(201).json({
        success: true,
        message: "Order placed successfully.",
        order
    })
}) 


//get all orders 
export const getAllOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find();
        
    res.status(200).json({
        success: true,
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

        // send email notification
        const orderCreatedOn = moment(order.orderCreatedOn).format('YYYY-MM-DD');
        const message = `Hello ${order.shippingDetail.name}. \nWe are writing this email to inform you that your order which was made on  ${orderCreatedOn} has been shipped successfully! \nThank you for purchasing the art from our website!`
        sendEmailFromSite({sender: process.env.EMAIL_ADDRESS, receiver: order.shippingDetail.email, subject: "Order Shipped", message});
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


