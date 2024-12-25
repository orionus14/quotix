import { Request, Response } from 'express';

export const logoutController = (req: Request, res: Response) => {
    res.clearCookie('token', {
        sameSite: 'none',
        secure: true,
    })
    .status(200).json('Logged out successfully');
};