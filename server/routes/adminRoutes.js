import express from 'express'
import { getStats } from '../controllers/adminControllers.js';
import { isAdmin, isAuthenticated } from '../middleware/authMiddleware.js';

// express router
const router = express.Router();

router.route('/admin/stats').get(isAuthenticated, isAdmin, getStats);

export default router;