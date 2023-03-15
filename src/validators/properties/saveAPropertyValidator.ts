import Joi from "joi";

const Schema = Joi.object({
  propertyId: Joi.string().required()
});

export const saveAPropertyValidator = Schema;
