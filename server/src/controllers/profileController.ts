import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { jwtSecret } from '../config/config';

export const profileController = async (req: Request, res: Response) => {
    const token = req.cookies.token;
    if (!jwtSecret) {
        throw new Error('JWT_SECRET is not defined');
    }
    if (!token) {
        res.status(401).json('No token');
        return;
    }
    try {
        const decoded: any = jwt.verify(token, jwtSecret);
        const userId = decoded.userId;

        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json('User not found');
            return;
        }

        res.json({
            userId: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        });

    } catch (err) {
        res.status(500).json('Failed to verify token');
    }
};