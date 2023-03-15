import { NextFunction, Request, Response } from "express";

import { Loan, User } from "../../models";
import { uploads } from "../../utils";
import { loanValidator } from "../../validators";

export const applyForLoan = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error, value } = loanValidator.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: { message: error.details[0].message }
      });
    }
    //@ts-ignore
    const { validId, photo: avatar } = req.files;
    if (!validId) {
      return res.status(400).json({
        error: { message: "A valid ID must be uploaded" }
      });
    }
    if (!avatar) {
      return res.status(400).json({
        error: { message: "User photo must be uploaded" }
      });
    }
    console.log(req.body);
    value.property = value.propertyId;
    console.log(value);
    const media = await uploads(validId[0]);
    value.validIdURL = media.imageURL;
    value.validIdMedia = media;

    const media1 = await uploads(validId[0]);
    value.avatarURL = media1.imageURL;
    value.avatarMedia = media1;
    //@ts-ignore
    const { _id } = req.user;
    const loanData = {
      appliedBy: _id,
      loanAmount: value.loanAmount,
      interestAmount: value.interestAmount,
      property: value.propertyId
    };

    const user = await User.findOneAndUpdate({ _id }, value, { new: true });
    const loan = await Loan.create(loanData);

    return res.status(200).json({ status: "success", data: { loan, user } });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
