import mongoose, { Schema } from "mongoose";

const MessageSchema = new Schema({
    chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true },
    text: { type: String, required: true },
    senderType: {
        type: String,
        enum: ['user', 'api'],
        required: true
    },
}, { timestamps: true })

const Message = mongoose.model('Message', MessageSchema);
export default Message;