import Joi from "joi";

const Schema = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
  confirmNewPassword: Joi.string().required()
});

export const changePasswordValidator = Schema;
