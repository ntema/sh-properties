import { NextFunction, Request, Response } from "express";
import { Property } from "../../models";
export const getAproperty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: _id } = req.params;

    const data = await Property.findOne({ _id });

    return res.status(200).json({
      status: "success",
      data
    });
  } catch (error) {
    next(error);
  }
};
