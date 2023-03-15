import Joi from "joi";

const Schema = Joi.object({
  oldEmail: Joi.string().email().required(),
  newEmail: Joi.string().email().required(),
  password: Joi.string().required()
});

export const changeEmailValidator = Schema;
