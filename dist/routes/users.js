"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoutes = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middleware_1 = require("../middleware");
const router = (0, express_1.Router)();
router.get("/", middleware_1.userIsAuthenticated, middleware_1.verifyAdmin, controllers_1.getAllUsers);
router.get("/user", middleware_1.userIsAuthenticated, controllers_1.getLoggedUser);
router.get("/:id", controllers_1.getUserById);
router.patch("/delete-user", middleware_1.userIsAuthenticated, controllers_1.deleteAccount);
router.patch("/", middleware_1.userIsAuthenticated, controllers_1.updateProfile);
router.patch("/change-email", middleware_1.userIsAuthenticated, controllers_1.changeEmail);
exports.usersRoutes = router;
