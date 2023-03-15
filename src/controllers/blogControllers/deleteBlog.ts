import { NextFunction, Response, Request } from "express";
import { Blog} from "../../models";

export const deleteBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const deletedBlog = await Blog.findByIdAndDelete(id)

    return res
      .status(200)
      .json({ message: "delete Successful", blog: deletedBlog });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
