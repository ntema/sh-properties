import { NextFunction, Request, Response } from "express";

import { Package } from "../../models";
import { addAPackageValidator, updateProfileValidator } from "../../validators";

export const addAPackage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error, value } = addAPackageValidator.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: { message: error.details[0].message }
      });
    }

    //@ts-ignore
    const package_ = await Package.create(value);

    return res.status(201).json({ status: "success", data: package_ });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
