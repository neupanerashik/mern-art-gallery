import express from 'express'
import { getChatMessages, getMyChats, newMessage } from '../controllers/chatControllers.js';
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route('/chats').get(isAuthenticated, getMyChats);
router.route('/messages').get(isAuthenticated, getChatMessages);
router.route('/message/new').post(isAuthenticated, newMessage);

export default router