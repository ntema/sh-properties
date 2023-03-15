"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyticsRoutes = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middleware_1 = require("../middleware");
const router = (0, express_1.Router)();
router.get("/", middleware_1.userIsAuthenticated, controllers_1.getUserDashboardSummary);
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
exports.analyticsRoutes = router;
