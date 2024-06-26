import { z } from 'zod';

export const updateProductSchema = z.object({
    name: z.string({
        invalid_type_error: 'Product name must be a string',
        required_error: 'Product name is required'
    }).optional(),
    description: z.string({
        invalid_type_error: 'Product description must be a string',
        required_error: 'Product description is required'
    }).optional(),
    price: z.number({
        invalid_type_error: 'Product price must be a number',
        required_error: 'Product price is required'
    }).int().min(0).optional(),
    stock: z.number({
        invalid_type_error: 'Product stock must be a number',
        required_error: 'Product stock is required'
    }).int().min(0).optional(),
}).strict({ message: 'Invalid update product' });