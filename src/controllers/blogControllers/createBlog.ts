import { NextFunction, Response, Request } from "express";
import { Blog } from "../../models/Blog";
import { blogValidate } from "../../validators";

export const createBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error, value } = blogValidate.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: { message: error.details[0].message }
      });
    }
    const newBlog = await Blog.create(value);
    return res.status(201).json({ status: "success", blog: newBlog });
  } catch (error) {
    console.log(error);
    next(error);
  }
};


