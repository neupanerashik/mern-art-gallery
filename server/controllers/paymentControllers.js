import axios from 'axios'
import Stripe from 'stripe'
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
    const {token, amount} = req.body;

    const {data} = await axios.post(
        "https://khalti.com/api/v2/payment/verify/", 
        {"token": token, "amount": amount}, 
        {headers: {'Authorization': `Key ${process.env.KHALTI_SECRET_KEY}`}}
    )

    res.status(200).json({
        success: true,
        verified_payment: data
    })
})