import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { envs } from '../config/envs';

const AUTH_SERVICE_URL = envs.AUTH_SERVICE_URL;

export const authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = authorizationHeader.split(' ')[1]; 
    console.log(token);
    

    try {
        const response = await axios.post(`${AUTH_SERVICE_URL}/validate-token`, null, {
            headers: {
                Authorization: authorizationHeader
            }
        });

        if (response.status !== 200 || !response.data.valid) {
            return res.status(403).json({ message: 'Token has expired' });
        }

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

