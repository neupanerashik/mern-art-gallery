import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema(
	{
		chatId: {
			type: mongoose.Schema.ObjectId,
            ref: 'Chat',
			required: true
		},
		sender: {
			type: mongoose.Schema.ObjectId,
            ref: 'User',
			required: true
		},
		receiver: {
			type: mongoose.Schema.ObjectId,
            ref: 'User',
		},
		text: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true
	}
)

// exporting model
export const Message = mongoose.model('Message', messageSchema);
