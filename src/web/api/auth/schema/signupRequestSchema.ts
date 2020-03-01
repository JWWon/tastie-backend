import * as Joi from 'joi';
import { AccessTokenRequestSchema } from './accessTokenRequestSchema';

export const SignupRequestSchema = AccessTokenRequestSchema.keys({
  name: Joi.string()
    .required()
    .min(2)
    .max(20),

  birthYear: Joi.number()
    .optional()
    .min(1900)
    .max(2500),
});
