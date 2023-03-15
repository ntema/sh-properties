import Joi from "joi";

const Schema = Joi.object({
  name: Joi.string().required(),
  amount: Joi.string().required(),
  interval: Joi.string().required(),
  propertyLimit: Joi.string().optional(),
  features: Joi.array().required()
});

export const addAPackageValidator = Schema;
