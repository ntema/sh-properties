import { NextFunction, Response, Request } from "express";
import { Booking } from "../../models";
import { addBookingValidator, loginValidator } from "../../validators";

export const bookAVisit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error, value } = addBookingValidator.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: { message: error.details[0].message }
      });
    }

    value.property = value.propertyId;
    console.log(value);
    //@ts-ignore
    value.bookee = req.user._id;

    const booking = await Booking.create(value);
    return res.status(201).json({ status: "success", data: booking });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
