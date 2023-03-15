import { Router } from "express";
import { multerUpload } from "../config";

import {
  createBlog,
  deleteBlog,
  editBlog,
  getAllBlogs,
  getSingleBlog
} from "../controllers";
import { userIsAuthenticated } from "../middleware";


const router = Router();

router.get('/', getAllBlogs);
router.get('/:id', getSingleBlog);
router.delete('/:id',userIsAuthenticated, deleteBlog);

router.post(
  "/",
  userIsAuthenticated,
  multerUpload.single("image"),
  createBlog
);

router.put(
  "/",
  userIsAuthenticated,
  multerUpload.single("image"),
  editBlog
);


export const blogRoutes = router;


