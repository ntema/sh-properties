import { Router } from "express";
import { multerUpload } from "../config";

import {
  addNewProperty,
  getAllProperties,
  saveAProperty,
  getLoggedUserSavedProperties,
  unSaveAProperty,
  getAproperty,
  bookAVisit,
  getAllBookings,
  getBookingsByLoggedUser,
  getApropertyBySlug
} from "../controllers";
import { userIsAuthenticated } from "../middleware";


const router = Router();

router.get("/bookings", userIsAuthenticated, getAllBookings);
router.get("/property/:slug", getApropertyBySlug);

router.get("/bookings/a-user", userIsAuthenticated, getBookingsByLoggedUser);

router.get("/", getAllProperties);
router.get("/favourites", userIsAuthenticated, getLoggedUserSavedProperties);
router.get("/:id", getAproperty);

router.post("/booking", userIsAuthenticated, bookAVisit);
router.post(
  "/",
  userIsAuthenticated,
  multerUpload.array("images"),
  addNewProperty
);

router.post("/favourites", userIsAuthenticated, saveAProperty);
router.delete("/favourites/:id", userIsAuthenticated, unSaveAProperty);

export const propertiesRoutes = router;
