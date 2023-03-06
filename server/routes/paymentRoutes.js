import express from 'express'
const router = express.Router();

import { createPaymentIntent, getStripePK } from '../controllers/paymentControllers.js';

// get stripe publishable key
router.route('/stripe-publishable-key').get(getStripePK);

// create payment intent
router.route('/create-payment-intent').post(createPaymentIntent);


export default router