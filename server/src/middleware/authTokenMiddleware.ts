import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/config';

interface JwtPayload {
    userId: string;
}

export const authTokenMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.cookies.token;
    if (!jwtSecret) {
        throw new Error('JWT_SECRET is not defined');
    }
    if (!token) {
        res.status(401).json({ message: 'No token provided' });
        
    }
    
    try {
        const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
        req.userId = decoded.userId;
        
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid or expired token' });
        return;
    }
};