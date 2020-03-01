import * as Joi from 'joi';
import { AccessTokenRequestSchema } from './accessTokenRequestSchema';

export const SignupRequestSchema = AccessTokenRequestSchema.keys({
  password: Joi.when('type', {
    is: 'email',
    then: Joi.string()
      .regex(new RegExp('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$'))
      .required(),
  }),

  name: Joi.string()
    .required()
    .min(2)
    .max(20),

  birthYear: Joi.number()
    .optional()
    .min(1900)
    .max(2500),
});
