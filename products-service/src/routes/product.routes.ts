import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import { ProductService } from "../services/product.service";
import { validateData } from "../middleware/validateData";
import { productSchema } from "../schemas/productSchema";
import { updateProductSchema } from "../schemas/updateSchema";
import { authenticateJWT } from "../middleware/validateToken";
import { registerLogs } from "../middleware/registerLogs";

export class ProductRoutes {


  static get routes(): Router {

    const router = Router();
    const productService = new ProductService();
    const controller = new ProductController(productService);

    router.get("/product",registerLogs, authenticateJWT ,controller.getProducts);
    router.post("/product",registerLogs, authenticateJWT,validateData(productSchema),controller.createProduct);
    router.get("/product/:id",registerLogs, authenticateJWT, controller.getProductById);
    router.put("/product/:id",registerLogs, authenticateJWT, validateData(updateProductSchema), controller.updateProduct);
    router.delete("/product/:id",registerLogs, authenticateJWT,controller.deleteProduct);

    return router;
  }


}