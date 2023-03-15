import Joi from "joi";

const Schema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});

export const loginValidator = Schema;
