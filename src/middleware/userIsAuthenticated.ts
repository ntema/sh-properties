import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";
import { constants } from "../config";
import { User } from "../models";

export const userIsAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const headers = req.headers;
  //   console.log(headers);
  let token = headers["authorization"];

  //   console.log(token);
  if (!token) {
    return res.status(401).json({ error: "Access Denied" });
  }
  token = token.split(" ")[1];
  try {
    const payload = await jwt.verify(token, constants.USER_TOKEN_SECRET);
    console.log(payload);
    //@ts-ignore
    req.user = await User.findOne({ _id: payload._id }).select("+password");
    next();
  } catch (err) {
    return res.status(403).json(err);
  }
};
