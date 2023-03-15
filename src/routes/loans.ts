import { Router } from "express";
import { multerUpload } from "../config";

import { getAllLoans, getLoggedUser, updateProfile } from "../controllers";
import { applyForLoan } from "../controllers/loansControllers/applyForLoan";
import { userIsAuthenticated, verifyAdmin } from "../middleware";



const router = Router();

router.get("/", userIsAuthenticated, verifyAdmin, getAllLoans);
router.get("/a-user", userIsAuthenticated, getAllLoans);

router.post(
  "/",
  userIsAuthenticated,
  multerUpload.fields([
    {
      name: "photo",
      maxCount: 1
    },
    {
      name: "validId",
      maxCount: 1
    }
  ]),
  applyForLoan
);

export const loansRoutes = router;
