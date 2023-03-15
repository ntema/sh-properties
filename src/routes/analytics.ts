import { Router } from "express";

import { getUserDashboardSummary } from "../controllers";
import { userIsAuthenticated } from "../middleware";

const router = Router();

router.get("/", userIsAuthenticated, getUserDashboardSummary);
// router.get("/a-user", userIsAuthenticated, getAllLoans);

// router.post(
//   "/",
//   userIsAuthenticated,
//   multerUpload.fields([
//     {
//       name: "photo",
//       maxCount: 1
//     },
//     {
//       name: "validId",
//       maxCount: 1
//     }
//   ]),
//   applyForLoan
// );

export const analyticsRoutes = router;
