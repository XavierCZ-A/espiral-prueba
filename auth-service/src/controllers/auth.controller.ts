import{ Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { CustomError } from '../config/custom.errors';


export class AuthController {

    constructor(private authService: AuthService) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        console.log(`${error}`);
        return res.status(500).json({ error: 'Internal server error' })
    }

    registerUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = await this.authService.register(req.body);
            res.json(user);
        } catch (error) {
            this.handleError(error, res);
        }
    }

    loginUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = await this.authService.login(req.body);
            res.json(user);
        } catch (error) {
            this.handleError(error, res);
        }
    }
    
    validateToken = async (req: Request, res: Response) => {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(400).json({ message: 'Bearer token is required' });
        }
        const token = authHeader.split('Bearer ')[1];

        try {
            const isValid = await this.authService.validateToken(token);
            if (isValid) {
                return res.status(200).json({ valid: true });
            } else {
                return res.status(403).json({ valid: false });
            }
        } catch (error) {
            this.handleError(error, res);            
        }
    };

}
