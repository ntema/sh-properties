import { NextFunction, Response, Request } from "express";
import { User } from "../../models";
import { registerValidator } from "../../validators";
import jwt from "jsonwebtoken";
import { constants } from "../../config";
import bcrypt from "bcrypt";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error, value } = registerValidator.validate(req.body);

    if (error) {
      console.log("here-2");
      return res.status(400).json({
        error: { message: error.details[0].message }
      });
    }

    const isUser = await User.findOne({ email: value.email });
    if (isUser) {
      return res.status(400).json({
        error: { status: "fail", message: "Email already exists" }
      });
    }

    value.password = await bcrypt.hash(value.password, 12);
    const user = await User.create(value);

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      constants.USER_TOKEN_SECRET,
      {
        expiresIn: constants.TOKEN_EXPIRATION_TIME
      }
    );
    const refreshToken = jwt.sign(
      { _id: user._id },
      constants.REFRESH_TOKEN_SECRET,
      { expiresIn: "14d" }
    );

    return res.status(200).json({
      status: "success",
      data: { token, type: "bearer", refreshToken, user }
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
