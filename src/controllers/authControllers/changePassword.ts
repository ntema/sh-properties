import { NextFunction, Response, Request } from "express";
import { User } from "../../models";
import { changePasswordValidator } from "../../validators";

import bcrypt from "bcrypt";

export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error, value } = changePasswordValidator.validate(req.body);

    if (error) {
      console.log("here-2");
      return res.status(400).json({
        error: { message: error.details[0].message }
      });
    }

    //@ts-ignore
    let user = req.user;
    const isPassword = await bcrypt.compare(value.oldPassword, user.password);
    if (!isPassword) {
      return res.status(400).json({
        error: { status: "fail", message: "Invalid password" }
      });
    }

    if (value.newPassword !== value.confirmNewPassword) {
      return res.status(400).json({
        error: {
          status: "fail",
          message: "New password and 'Confirm New Password must match'"
        }
      });
    }
    const password = await bcrypt.hash(value.newPassword, 12);
    await User.findOneAndUpdate({ _id: user._id }, { password });

    return res.status(200).json({
      status: "success",
      data: user
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
