import { Request, Response, NextFunction } from 'express';
import Chat from '../models/Chat';
import { log } from 'console';

export const updateChatController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { chatId } = req.params;
    const { userFirstName: firstName, userLastName: lastName } = req.body;


    if (!firstName || !lastName) {
        res.status(400).json({ message: 'First name and last name are required' });
        return;
    }

    try {
        const chat = await Chat.findById(chatId);

        if (!chat) {
            res.status(404).json({ message: 'Chat not found' });
            return;
        }

        chat.firstName = firstName;
        chat.lastName = lastName;

        await chat.save();

        res.status(200).json({ message: 'Chat updated successfully', updatedChat: chat });
    } catch (error) {
        console.error('Error updating chat:', error);
        res.status(500).json({ message: 'Server error' });
    }
};