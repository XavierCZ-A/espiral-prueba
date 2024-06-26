import { CustomError } from "../config/custom.errors";
import Database from "../data/mysql/databases";
import Product from "../models/product.model";

const db = Database.getInstance();

export class ProductService {

  async getProducts(): Promise<Product[]> {
    try {
      const sql = 'SELECT * FROM products';
      const result = await db.query(sql);
      return result;
    } catch (error) {
      throw CustomError.internalServer('Internal Server Error');
    }
  }

  async getProductById(id: number): Promise<Product | null> {
    const sql = 'SELECT * FROM products WHERE id = ?';
    const result = await db.query(sql, [id]);
    if (result.length === 0) throw CustomError.notFound('Product not found');
    try {
      return result[0];
    } catch (error) {
      throw CustomError.internalServer('Internal Server Error');
    }
  }

  async createProduct(product: Product, userId?: number): Promise<Product> {
    const { name, description, price, stock = 0 } = product;
    const sql = 'INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)';
    const productCreate = await db.query(sql, [name, description, price, stock]);
    if (productCreate.affectedRows === 0) throw CustomError.badRequest('Product not created');

    try {
      
      return {
        name,
        description,
        price,
        stock,
      }
    } catch (error) {
      throw CustomError.internalServer('Internal Server Error');
    }
  }

  async updateProduct(id: number, product: Product): Promise<boolean> {
    const { name, description, price, stock } = product;
    const sql = "UPDATE products SET name = IFNULL(?, name), description = IFNULL(?, description), price = IFNULL(?, price), stock = IFNULL(?, stock) WHERE id = ?";
    const result = await db.query(sql, [name, description, price, stock, id]);
    if (result.affectedRows === 0) throw CustomError.notFound('Product not found');
    try {
      return result.affectedRows > 0;
    } catch (error) {
      throw CustomError.internalServer('Internal Server Error');
    }
  }

  async deleteProduct(id: number): Promise<boolean> {
    const sql = 'DELETE FROM products WHERE id = ?';
    const result = await db.query(sql, [id]);
    if (result.affectedRows === 0) throw CustomError.notFound('Product not found');
    try {
      return result.affectedRows > 0;
    } catch (error) {
      throw CustomError.internalServer('Internal Server Error');
    }
  }
}
