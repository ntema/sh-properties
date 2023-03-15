import { NextFunction, Request, Response } from "express";
import { User, Property, Booking } from "../../models";
export const getUserDashboardSummary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req;
    //@ts-ignore
    const { _id } = req.user;

    const propertiesCount = await Property.find({
      uploadedBy: _id
    }).countDocuments();
    const bookingsCount = await Booking.find({
      bookee: _id
    }).countDocuments();
    const wallet = await User.findOne({
      _id
    }).select("wallet");

    return res.status(200).json({
      status: "success",
      data: { bookingsCount, propertiesCount, wallet }
    });
  } catch (error) {
    next(error);
  }
};
