import { NextFunction, Response, Request } from "express";
import { Blog} from "../../models";

export const getSingleBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      return res.status(200).json(blog);
    } else {
      return res.status(400).json("no blog found");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};






