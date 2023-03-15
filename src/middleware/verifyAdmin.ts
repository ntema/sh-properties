import { NextFunction, Request, Response } from "express";
import { userIsAuthenticated } from "./userIsAuthenticated";
export const verifyAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  userIsAuthenticated(req, res, () => {
    //@ts-ignore
    if (["admin"].includes(req.user.role)) {
      next();
    } else {
      return res
        .status(401)
        .json({ error: { message: "You're not authorized" } });
    }
  });
};
