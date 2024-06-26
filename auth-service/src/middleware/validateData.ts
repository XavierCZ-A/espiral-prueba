import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const validateData = (schema: z.ZodType<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ errors: error.errors.map((e) => e.message) });
            }
            return res.status(500).json({ message: 'Internal server error' });
        }
    };

}