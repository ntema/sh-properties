import { Router } from "express";


import {
  getAllUsers,
  getLoggedUser,
  getUserById,
  updateProfile,
  changeEmail,
  deleteAccount
} from "../controllers";
import { userIsAuthenticated, verifyAdmin } from "../middleware";

const router = Router();

router.get("/", userIsAuthenticated, verifyAdmin, getAllUsers);
router.get("/user", userIsAuthenticated, getLoggedUser);
router.get("/:id", getUserById);
router.patch("/delete-user", userIsAuthenticated, deleteAccount);

router.patch("/", userIsAuthenticated, updateProfile);
router.patch("/change-email", userIsAuthenticated, changeEmail);

export const usersRoutes = router;
