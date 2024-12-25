import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/config';

export const loginController = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!jwtSecret) {
        throw new Error('JWT_SECRET is not defined');
    }
    const foundUser = await User.findOne({ email });
    if (foundUser) {
        const isCorrectPassword = bcrypt.compareSync(password, foundUser.password);
        if (isCorrectPassword) {
            jwt.sign({ userId: foundUser._id }, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token, {
                    sameSite: 'none',
                    secure: true,
                    maxAge: 30 * 24 * 60 * 60 * 1000
                }).json({ id: foundUser._id });
            });
        } else {
            res.status(401).json('Incorrect password');
        }
    } else {
        res.status(403).json('User not found');
    }
};