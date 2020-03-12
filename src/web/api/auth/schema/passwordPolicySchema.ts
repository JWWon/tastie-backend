import * as Joi from 'joi';

export const PasswordPolicySchema = Joi.string()
  .regex(new RegExp('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$'))
  .required();
