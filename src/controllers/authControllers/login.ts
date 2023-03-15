import { NextFunction, Response, Request } from "express";
import { User } from "../../models";
import { loginValidator } from "../../validators";
import jwt from "jsonwebtoken";
import { constants } from "../../config";
import bcrypt from "bcrypt";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error, value } = loginValidator.validate(req.body);

    if (error) {
      return res.status(400).json({
        error: { message: error.details[0].message }
      });
    }
    console.log("here-3");

    const user = await User.findOne({ username: value.username }).select(
      "+password"
    );
    if (!user) {
      return res.status(400).json({
        error: {
          status: "fail",
          message: "Invalid username/password combination"
        }
      });
    }
    if (!user.isActivated) {
      return res.status(400).json({
        error: { message: "Your Account is not yet verified by management" }
      });
    }

    const isPassword = await bcrypt.compare(value.password, user.password);
    if (!isPassword) {
      return res.status(400).json({
        error: {
          status: "fail",
          message: "Invalid username/password combination"
        }
      });
    }
    const token = jwt.sign({ _id: user._id, role:user.role }, constants.USER_TOKEN_SECRET, {
      expiresIn: constants.TOKEN_EXPIRATION_TIME
    });
    const refreshToken = jwt.sign(
      { _id: user._id, role:user.role },
      constants.REFRESH_TOKEN_SECRET,
      { expiresIn: "14d" }
    );

    return res.status(200).json({
      ststus: "success",
      data: { token, type: "bearer", refreshToken, user }
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
