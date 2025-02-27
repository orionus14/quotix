import dotenv from 'dotenv';

dotenv.config();

export const mongoUrl = process.env.MONGO_URL;

export const jwtSecret = process.env.JWT_SECRET;