import * as Joi from 'joi';
import { PasswordPolicySchema } from './passwordPolicySchema';

export const PatchPasswordRequestSchema = Joi.object({
  code: Joi.string().required(),
  password: PasswordPolicySchema,
});
