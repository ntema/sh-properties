import { NextFunction, Request, Response } from "express";

import { User } from "../../models";

export const getLoggedUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //@ts-ignore
    const _id = req.user._id;
    const user = await User.findOne({ _id });

    return res.status(200).json({ status: "success", data: user });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
