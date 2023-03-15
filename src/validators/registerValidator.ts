import Joi from "joi";

const Schema = Joi.object({
  email: Joi.string().required(),
  username: Joi.string().required(),
  referral: Joi.string().optional(),
  password: Joi.string().required()
});

export const registerValidator = Schema;
