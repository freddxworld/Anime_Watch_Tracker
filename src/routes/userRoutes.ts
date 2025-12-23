import { Router } from "express";
import { registerUser, loginUser } from "../controllers/userControl";
import { validateBody } from "../middleware/validate";
import { registerSchema, loginSchema } from "../validation/userSchema";

const router = Router();

router.post("/register", validateBody(registerSchema),registerUser);
router.post("/login", validateBody(loginSchema),loginUser);

export default router;