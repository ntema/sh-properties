"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loansRoutes = void 0;
const express_1 = require("express");
const config_1 = require("../config");
const controllers_1 = require("../controllers");
const applyForLoan_1 = require("../controllers/loansControllers/applyForLoan");
const middleware_1 = require("../middleware");
const router = (0, express_1.Router)();
router.get("/", middleware_1.userIsAuthenticated, middleware_1.verifyAdmin, controllers_1.getAllLoans);
router.get("/a-user", middleware_1.userIsAuthenticated, controllers_1.getAllLoans);
router.post("/", middleware_1.userIsAuthenticated, config_1.multerUpload.fields([
    {
        name: "photo",
        maxCount: 1
    },
    {
        name: "validId",
        maxCount: 1
    }
]), applyForLoan_1.applyForLoan);
exports.loansRoutes = router;
