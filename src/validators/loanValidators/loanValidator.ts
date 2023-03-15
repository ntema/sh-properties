import Joi from "joi";

const Schema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  dob: Joi.string().required(),
  state: Joi.string().required(),
  phone: Joi.number().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  bvn: Joi.string().required().length(10),
  propertyId: Joi.string().required(),
  loanAmount: Joi.number().required(),
  interestAmount: Joi.number().required()
});

export const loanValidator = Schema;
