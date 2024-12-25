import { Request, Response, NextFunction } from 'express';
import Chat from '../models/Chat';
import User from '../models/User';

export const createChatController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { firstName, lastName } = req.body;
    const userId = req.userId;

    if (!firstName || !lastName) {
        res.status(400).json({ message: 'First and last names are required' });
        return;
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const newChat = new Chat({
            firstName,
            lastName,
            user: userId,
        });

        await newChat.save();
        res.status(201).json({ message: 'Chat created successfully' });
    } catch (error) {
        console.error('Error creating chat:', error);
        res.status(500).json({ message: 'Server error' });
    }
};