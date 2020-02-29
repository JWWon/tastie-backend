import * as Joi from 'joi';
import { AuthTypeList } from '../dto';

export const AccessTokenRequestSchema = Joi.object({
  type: Joi.string()
    .valid(AuthTypeList)
    .required(),
  token: Joi.when('type', {
    is: 'email',
    otherwise: Joi.string().required(),
  }),
  email: Joi.when('type', {
    is: 'email',
    then: Joi.string()
      .email()
      .required(),
  }),
  password: Joi.when('type', {
    is: 'email',
    then: Joi.string()
      .max(8)
      .required(),
  }),
});
