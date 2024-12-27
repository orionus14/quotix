import { Request, Response } from 'express';
import User from '../models/User';
import Chat from '../models/Chat';
import Message from '../models/Message';

export const profileController = async (req: Request, res: Response) => {
    try {
        const userId = req.userId;
        if (!userId) {
            res.status(401).json({ message: 'User not authenticated' });
            return;
        }
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json('User not found');
            return;
        }

        const chats = await Chat.find({ user: userId }).populate('messages');
        const getChatMessage = await Promise.all(chats.map(async (chat) => {
            const lastMessage = await Message.findOne({ chatId: chat._id })
                .sort({ createdAt: -1 })
                .limit(1);

            return {
                ...chat.toObject(),
                messages: lastMessage ? [lastMessage] : []
            };
        }));
        
        res.json({
            userId: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            chats: getChatMessage
        });
    } catch (err) {
        console.error('Error in profileController:', err);
        res.status(500).json({ message: 'Server error', error: err instanceof Error ? err.message : 'Unknown error' });
    }
};