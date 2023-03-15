import { NextFunction, Response, Request } from "express";
import { Blog} from "../../models";


export const getAllBlogs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const blog = await Blog.find().sort({createdAt:-1});
    if (blog) {
      return res.status(200).json(blog);
    } else {
      return res.status(400).json("no blogs found");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
