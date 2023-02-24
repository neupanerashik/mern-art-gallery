import { Chat } from '../models/chatModel.js'
import { Message } from '../models/messageModel.js';
import catchAsyncError from '../utility/catchAsyncError.js'

// get my chats
export const getMyChats = catchAsyncError(async (req, res, next) => {
    const chats = await Chat.find({participants: {$in: [req.query.myId]}})

    res.status(200).json({
        success: true,
        message: "Successfully retrieved all chats.",
        chats
    });
});


// get chat messages
export const getChatMessages = catchAsyncError(async (req, res, next) => {
        const chatMessages = await Message.find({chatId: req.query.chatId});
        res.status(200).json({
            success: true,
            message: "Messages fetched successfully!",
            chatMessages
        })
    }
)


// new message
export const newMessage = catchAsyncError(async (req, res, next) => {
    const message = await Message.create(req.body);

    res.status(200).json({
        success: true,
        message: "Message sent successfully!",
        message
    })
    }
)