import Joi from "joi";

const Schema = Joi.object({
  password: Joi.string().required()
});

export const deleteAccountValidator = Schema;
