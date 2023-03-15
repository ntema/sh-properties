import { Router } from "express";
import { multerUpload } from "../config";

import { getAllMessages } from "../controllers";
import { newMessage } from "../controllers/messagesController/newMessage";
import { userIsAuthenticated } from "../middleware";
const router = Router();
router.get("/", userIsAuthenticated, getAllMessages);
router.post("/", userIsAuthenticated, newMessage);

export const messagesRoutes = router;
