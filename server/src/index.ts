import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './models/User';
import jwt from 'jsonwebtoken';
import cors from 'cors';

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

app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.get("/", (req: Request, res: Response) => {
    res.send("hi")
});

app.post('/register', async (req: Request, res: Response) => {
    const { email, username, password } = req.body;
    try {
        const createdUser = await User.create({ email, username, password });
        const token = jwt.sign({ userId: createdUser._id }, jwtSecret);
        res.status(201).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating user');
    }
});

app.listen(port, () => {
    console.log(`now listening on port ${port}`);
})