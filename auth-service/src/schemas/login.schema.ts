import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string({
        invalid_type_error: 'Email must be a string',
        required_error: 'Email is required'
    }).email('Invalid email'),
    password: z.string({
        required_error: 'Password is required'
    })
}).strict({ message: 'User is not valid' });

