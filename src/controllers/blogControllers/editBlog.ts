import { NextFunction, Response, Request } from "express";
import { Blog} from "../../models";

export const editBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { body } = req;
    const update = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        $set: body
      },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Update Successful", updated: body, update });
  } catch (error) {
    console.log(error);
    next(error);
  }
};






