import { Router } from "express";
import UserController from "../controllers/UserController";
const router = Router();

router.get("/users", UserController.findAll);
router.post("/users", UserController.create);
router.put("/users", UserController.update);
router.delete("/users/:id", UserController.delete);

export default router;
