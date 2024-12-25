import mongoose from 'mongoose';
import { mongoUrl } from './config';

export const connectToDatabase = () => {
    if (!mongoUrl) {
        throw new Error('MongoURL is undefined');
    }
    mongoose.connect(mongoUrl)
        .then(() => {
            console.log('Connected to MongoDB');
        }).catch((error) => {
            console.error('Error connecting to MongoDB:', error);
        });
};