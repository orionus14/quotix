import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectToDatabase } from './config/database';
import routes from './routes';
import './types/express';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

connectToDatabase();
app.use('/api', routes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});