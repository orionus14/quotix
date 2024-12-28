import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/config';
import Message from '../models/Message';
import Chat from '../models/Chat';

const bcryptSalt = bcrypt.genSaltSync(10);

// 3 predefined chats
const initialChats = [
    { firstName: 'Luke', lastName: 'Skywalker' },
    { firstName: 'Anakin', lastName: 'Skywalker' },
    { firstName: 'Obi-Wan', lastName: 'Kenobi' }
];

const defaultMessage = {
    text: 'Type "quote" to get the random quote',
    senderType: 'user',
};

export const registerController = async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;
    if (!jwtSecret) {
        throw new Error('JWT_SECRET is not defined');
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'User with this email already exists' });
            return;
        }
        const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
        const createdUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        for (const chatData of initialChats) {
            const chat = await Chat.create({
                firstName: chatData.firstName,
                lastName: chatData.lastName,
                user: createdUser._id,
                messages: []
            });

            const message = await Message.create({
                chatId: chat._id,
                text: defaultMessage.text,
                senderType: defaultMessage.senderType,
            });

            chat.messages.push(message._id);
            await chat.save();
        }

        jwt.sign({ userId: createdUser._id }, jwtSecret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token, {
                sameSite: 'none',
                secure: true,
                maxAge: 30 * 24 * 60 * 60 * 1000
            }).status(201).json({ id: createdUser._id });
        });
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).send('Error creating user');
    }
};