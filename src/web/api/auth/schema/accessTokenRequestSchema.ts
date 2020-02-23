import * as Joi from 'joi';

export const AccessTokenRequestSchema = Joi.object({
  type: Joi.string().required(),
  token: Joi.string().optional(),
  email: Joi.string()
    .email()
    .optional(),
  password: Joi.string().optional(),
});
