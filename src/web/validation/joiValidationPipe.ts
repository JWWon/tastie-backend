import * as Joi from 'joi';
import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private readonly schema: Joi.ObjectSchema) {}

  public transform(value: any, metadata: ArgumentMetadata) {
    const { error } = Joi.validate(value, this.schema);
    if (error) {
      throw new BadRequestException({
        message: 'Validation failed',
        detail: error.message.replace(/"/g, `'`),
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    return value;
  }
}
