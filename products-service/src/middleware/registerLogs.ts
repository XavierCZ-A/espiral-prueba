import { Request, Response, NextFunction } from 'express';
import Database from '../data/mysql/databases';

const db = Database.getInstance();


export const registerLogs = async (req: Request, res: Response, next: NextFunction) => {
    const { method, originalUrl } = req;
    const action = `${method} ${originalUrl}`;

    try {
        await db.query('INSERT INTO logs (action) VALUES (?)', [action]);

        next();
    } catch (error) {
        console.error('Error logging action:', error);
    }

};
