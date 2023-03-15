import { NextFunction, Response, Request } from "express";
import { SavedProperty } from "../../models";
import { saveAPropertyValidator } from "../../validators";
export const saveAProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error, value } = saveAPropertyValidator.validate(req.body);

    if (error) {
      return res.status(400).json({
        error: { message: error.details[0].message }
      });
    }
    //@ts-ignore
    const { _id: savedBy } = req.user;
    const body = { property: value.propertyId, savedBy };

    const property = await SavedProperty.create(body);

    return res.status(200).json({
      status: "success",
      data: property
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
