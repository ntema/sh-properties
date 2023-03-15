import { NextFunction, Response, Request } from "express";
import { User } from "../../models";
import { deleteAccountValidator } from "../../validators";

import bcrypt from "bcrypt";

export const deleteAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error, value } = deleteAccountValidator.validate(req.body);

    if (error) {
      return res.status(400).json({
        error: { message: error.details[0].message }
      });
    }

    //@ts-ignore
    let user = req.user;
    const isPassword = await bcrypt.compare(value.password, user.password);
    if (!isPassword) {
      return res.status(400).json({
        error: { status: "fail", message: "Invalid password" }
      });
    }

    await User.findOneAndRemove({ _id: user._id });

    return res.status(201).json({
      status: "success",
      message: "Account successfully deleted"
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
