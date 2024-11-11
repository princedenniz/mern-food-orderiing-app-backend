import { Router, Request, Response, NextFunction } from "express";
import MyUserController from "../controllers/MyUserController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyUserRequest } from "../middleware/validation";

const router = Router();

router.get("/", jwtCheck, jwtParse, MyUserController.getCurrentUser)

// Define POST route with async handling
router.post(
  "/",
  jwtCheck,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await MyUserController.createCurrentUser(req, res);
    } catch (error) {
      next(error); // Pass any errors to the global error handler
    }
  }
);

// Define PUT route with async handling and additional middleware
router.put(
  "/",
  jwtCheck,
  jwtParse,
  validateMyUserRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await MyUserController.updateCurrentUser(req, res);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
