import mongoose, { Schema } from "mongoose";

const ChatSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
}, { timestamps: true })

const Chat = mongoose.model('Chat', ChatSchema);
export default Chat;