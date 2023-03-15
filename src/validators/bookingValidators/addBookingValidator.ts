import Joi from "joi";

const Schema = Joi.object({
  visitDate: Joi.string().required(),
  description: Joi.string().optional(),
  propertyId: Joi.string().required()
});

export const addBookingValidator = Schema;
