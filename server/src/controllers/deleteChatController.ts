import { Request, Response, NextFunction } from 'express';
import Chat from '../models/Chat';

export const deleteChatController = async (req: Request, res: Response, next: NextFunction) => {
    const { chatId } = req.params;
    try {
        const deletedChat = await Chat.findByIdAndDelete(chatId);
        if (!deletedChat) {
            res.status(404).json({ message: 'Chat not found' });
            return;
        }

        res.status(200).json({ message: 'Chat deleted successfully' });
    } catch (error) {
        console.error('Error deleting chat:', error);
        res.status(500).json({ message: 'Server error' });
    }
};