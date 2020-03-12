import * as Joi from 'joi';
import { AccessTokenRequestSchema } from './accessTokenRequestSchema';
import { PasswordPolicySchema } from './passwordPolicySchema';

export const SignupRequestSchema = AccessTokenRequestSchema.keys({
  password: Joi.when('type', {
    is: 'email',
    then: PasswordPolicySchema,
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
