import Joi from "joi";

const Schema = Joi.object({
  from: Joi.string().required(),
  to: Joi.string().required(),
  content: Joi.string().required(),
  property: Joi.string().required()
});

export const newMessageValidator = Schema;
