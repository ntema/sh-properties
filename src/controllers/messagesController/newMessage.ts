import { NextFunction, Request, Response } from "express";

import { Loan, Message, User } from "../../models";

import { newMessageValidator } from "../../validators";

export const newMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error, value } = newMessageValidator.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: { message: error.details[0].message }
      });
    }
    const message = await Message.create(value);
    return res.status(201).json({ status: "success", data: message });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
