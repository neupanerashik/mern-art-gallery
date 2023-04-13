import express from 'express'
const router = express.Router();

import { createPaymentIntent, getStripePK, verifyKhaltiPayment } from '../controllers/paymentControllers.js';


// stripe routes
router.route('/stripe-publishable-key').get(getStripePK);
router.route('/create-payment-intent').post(createPaymentIntent);


// khalti routes
router.route('/verify-payment').post(verifyKhaltiPayment);

export default router