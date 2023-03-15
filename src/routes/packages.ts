import { Router } from "express";

import { addAPackage, getAllLoans, getAllPackages } from "../controllers";
import { userIsAuthenticated } from "../middleware";

const router = Router();

router.get("/", getAllPackages);
router.get("/a-user", userIsAuthenticated, getAllLoans);

router.post(
  "/",
  userIsAuthenticated,

  addAPackage
);

export const packagesRoutes = router;
