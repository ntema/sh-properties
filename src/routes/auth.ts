import { Router } from "express";

import { changePassword, login, register } from "../controllers";
import { userIsAuthenticated } from "../middleware";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.patch("/change-password", userIsAuthenticated, changePassword);

export const authRouter = router;
