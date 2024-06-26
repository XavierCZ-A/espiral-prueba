import { Router } from "express";
import { AuthService } from "../services/auth.service";
import { AuthController } from "../controllers/auth.controller";
import { validateData } from "../middleware/validateData";
import { registerSchema } from "../schemas/register.schema";
import { loginSchema } from "../schemas/login.schema";


export class AuthRoutes {


  static get routes(): Router {

    const router = Router();

    const authService = new AuthService();
    const controller = new AuthController(authService);

    router.post("/login", validateData(loginSchema), controller.loginUser);
    router.post("/register", validateData(registerSchema), controller.registerUser);
    router.post("/validate-token", controller.validateToken);

    return router;
  }


}