import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './models/User';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';

dotenv.config();

const mongoUrl = process.env.MONGO_URL;
if (!mongoUrl) {
    throw new Error('MONGO_URL is not defined');
}
mongoose.connect(mongoUrl);

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined');
}

const app = express();
const port = 4000;
const bcryptSalt = bcrypt.genSaltSync(10);

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.post('/register', async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;
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
                secure: false,
                maxAge: 30 * 24 * 60 * 60 * 1000
            }).status(201).json({ id: createdUser._id });
        });
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).send('Error creating user');
    }
});

app.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;
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
                }).json({ id: foundUser._id })
            })
        } else {
            res.status(401).json('Incorrect password');
        }
    } else {
        res.status(403).json('User not found');
    }
})

app.get('/profile', async (req: Request, res: Response) => {
    const token = req.cookies.token;
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
});

app.listen(port, () => {
    console.log(`now listening on port ${port}`);
})