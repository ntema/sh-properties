import { NextFunction, Request, Response } from "express";
import { Property } from "../../models";
export const getApropertyBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { slug: nameSlug } = req.params;

    const data = await Property.findOne({ nameSlug });
    if (!data) {
      return res.status(404).json({
        status: "fail",
        message: "There is no property with the slug " + nameSlug
      });
    }

    return res.status(200).json({
      status: "success",
      data
    });
  } catch (error) {
    next(error);
  }
};
