import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string({
    invalid_type_error: 'Username must be a string',
    required_error: 'Username is required',
  }).min(2, 'Product name must be at least 2 characters long'),
  email: z.string({
    invalid_type_error: 'Email must be a string',
    required_error: 'Email is required',
  }).email('Invalid email'),
  password: z.string({
    required_error: 'Password is required',
  }).min(6, 'Password must be at least 6 characters long'),
}).strict({ message: 'User is not valid' });

