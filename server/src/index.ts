import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectToDatabase } from './config/database';
import routes from './routes';
import './types/express';
import './models/User';
import './models/Chat';
import './models/Message';
import { createServer } from "http"; 
import { Server } from "socket.io";
import initSockets from "./sockets/index";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

connectToDatabase();

app.use('/api', routes);

const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        credentials: true
    },
});

initSockets(io);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});