import mongoose from 'mongoose'

const chatSchema = new mongoose.Schema(
    {
		participants: {type: Array}
	},
	{
		timestamps: true
	}
)

// exporting model
export const Chat = mongoose.model('Chat', chatSchema)