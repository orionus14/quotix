import { Request, Response } from 'express';
import Message from '../models/Message';

export const getMessagesController = async (req: Request, res: Response) => {
    const { chatId } = req.params;

    try {
        const messages = await Message.find({ chatId });
        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ message: 'Failed to fetch messages' });
    }
};