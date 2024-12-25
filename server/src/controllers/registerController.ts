import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/config';

const bcryptSalt = bcrypt.genSaltSync(10);

export const registerController = async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;
    if (!jwtSecret) {
        throw new Error('JWT_SECRET is not defined');
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).send('User with this email already exists');
            return;
        }
        const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
        const createdUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });
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
