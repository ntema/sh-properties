import { NextFunction, Response, Request } from "express";
import { SavedProperty } from "../../models";
import { saveAPropertyValidator } from "../../validators";
export const unSaveAProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //@ts-ignore
    const body = { property: req.params.id };

    const property = await SavedProperty.findOneAndDelete(body);

    return res.status(200).json({
      status: "success",
      data: property
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
