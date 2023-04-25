import { Chat } from '../models/chatModel.js'
import { Message } from '../models/messageModel.js';
import catchAsyncError from '../utility/catchAsyncError.js'

// get my chats
export const getMyChats = catchAsyncError(async (req, res, next) => {
    const chats = await Chat.find({ participants: { $in: [req.query.myId] } });

    const latestMessages = await Message.aggregate([
        { $match: { chatId: { $in: chats.map((chat) => chat._id) }}},
        { $sort: { createdAt: -1 } },
        { $group: {_id: "$chatId", latestMessage: { $first: "$$ROOT" },},},
    ]);

    // Sort chats by the timestamp of the latest message
    chats.sort((chat1, chat2) => {
        const latestMsg1 = latestMessages.find((msg) => msg._id.toString() === chat1._id.toString());
        const latestMsg2 = latestMessages.find((msg) => msg._id.toString() === chat2._id.toString());
        if (latestMsg1 && latestMsg2) {
            return latestMsg2.latestMessage.createdAt - latestMsg1.latestMessage.createdAt;
        } else if (latestMsg1) {
            return -1;
        } else if (latestMsg2) {
            return 1;
        } else {
            return 0;
        }
    });

    res.status(200).json({
        success: true,
        message: "Successfully retrieved all chats.",
        chats,
    });
});


// get chat messages
export const getChatMessages = catchAsyncError(async (req, res, next) => {
        const chatMessages = await Message.find({chatId: req.query.chatId});

        res.status(200).json({
            success: true,
            message: "Messages fetched successfully!",
            chatMessages,
        })
    }
)

// new message
export const newMessage = catchAsyncError(async (req, res, next) => {
    const message = await Message.create(req.body);

    res.status(200).json({
        success: true,
        message: "Message sent successfully!",
        message,
    })
})