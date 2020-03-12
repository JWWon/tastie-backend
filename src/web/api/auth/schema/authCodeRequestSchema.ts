import * as Joi from 'joi';

export const AuthCodeRequestSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),

  redirect: Joi.string()
    .uri()
    .required(),
});
