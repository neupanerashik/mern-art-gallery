import axios from 'axios'
import Stripe from 'stripe'
import { User } from '../models/userModel.js'
import catchAsyncError from '../utility/catchAsyncError.js'

// publishable key
export const getStripePK = catchAsyncError(async (req, res, next) => {
    res.status(200).json({ stripePK: process.env.STRIPE_PUBLISHABLE_KEY });
})

// create intent
export const createPaymentIntent = catchAsyncError(async (req, res, next) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const intent = await stripe.paymentIntents.create({
        amount: Math.round(req.body.amount*100),
        currency: 'npr',
        payment_method_types: ['card'],
        receipt_email: req.body.email //Email address that the receipt for the resulting payment will be sent to.
    });
    
    res.status(200).json({
        success: true, 
        client_secret: intent.client_secret
    });
})


// khalti payment
export const verifyKhaltiPayment = catchAsyncError(async (req, res, next) => {
    const {token, amount, user_id} = req.body;
    const user = await User.findById(user_id);

    const {data} = await axios.post(
        "https://khalti.com/api/v2/payment/verify/", 
        {"token": token, "amount": amount}, 
        {headers: {'Authorization': `Key ${user.donation.khalti.secret_key}`}}
    )

    res.status(200).json({
        success: true,
        message: "Payment successful and verified!",
        verified_payment: data
    })
})