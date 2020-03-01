import * as Joi from 'joi';

export const QueryExistsAccountExistsSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),
});
