import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import Product from '../models/product.model';
import { CustomError } from '../config/custom.errors';

export class ProductController {

  constructor(private productService: ProductService) { }

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal server error' })
  }

  getProducts = async (_req: Request, res: Response): Promise<void> => {
    try {
      const products = await this.productService.getProducts();
      res.json(products);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const product = await this.productService.getProductById(id);
      res.json(product);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const product: Product = req.body;
      const createdProduct = await this.productService.createProduct(product);

      res.status(201).json({
        message: 'Product created successfully',
        Product: createdProduct,
      });

    } catch (error) {
      this.handleError(error, res);
    }
  }

  updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const product: Product = req.body;
      await this.productService.updateProduct(id, product);
      res.json({ message: 'Product updated successfully' });
    } catch (error) {
      this.handleError(error, res);
    }
  }

  deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      await this.productService.deleteProduct(id);
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      this.handleError(error, res);
    }
  }
}
