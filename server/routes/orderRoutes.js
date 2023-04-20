import express from 'express'
import { isAdmin, isAuthenticated } from '../middleware/authMiddleware.js'
import { 
    deleteOrder,
    getAllOrders, 
    getOrdersMade, 
    getOrdersReceived, 
    newOrder,
    updateOrder, 
} from '../controllers/orderControllers.js';

const router = express.Router();4

// general users routes
router.route('/order/new').post(isAuthenticated, newOrder);
router.route('/orders/made').get(isAuthenticated, getOrdersMade);
router.route('/orders/received').get(isAuthenticated, getOrdersReceived);

//admin routes
router.route('/admin/order/:id').put(isAuthenticated, isAdmin, updateOrder);
router.route('/admin/orders').get(isAuthenticated, isAdmin, getAllOrders);
router.route('/admin/order/:id').delete(isAuthenticated, isAdmin, deleteOrder);

export default router