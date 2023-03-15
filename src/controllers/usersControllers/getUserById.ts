import { NextFunction, Request, Response } from "express";

import { Property, User } from "../../models";

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //@ts-ignore
    const _id = req.params.id;
    const user = await User.findOne({ _id });
    const properties = await Property.find({ uploadedBy: user._id });

    return res
      .status(200)
      .json({ status: "success", data: { ...user.toObject(), properties } });
  } catch (error) {
    console.log(error);

    next(error);
  }
};
