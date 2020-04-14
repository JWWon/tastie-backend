import * as Joi from 'joi';
import { RestaurantStatusTypeList } from '@/entities/restaurant';

export const QueryRestaurantRequestSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .optional(),

  status: Joi.string()
    .valid(RestaurantStatusTypeList)
    .optional(),

  coordinate: Joi.string()
    .regex(new RegExp('[[0-9.]+,[0-9.]+]'))
    .optional(),

  withInKm: Joi.when('coordinate', {
    is: Joi.exist(),
    then: Joi.number()
      .min(0)
      .required(),
  }),
});
