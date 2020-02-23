import * as Joi from 'joi';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export type LoginType = 'email' | 'google' | 'facebook';
export class AccessTokenRequest {
  @ApiProperty()
  readonly type: LoginType;

  @ApiPropertyOptional()
  readonly token: string;

  @ApiPropertyOptional()
  readonly email: string;

  @ApiPropertyOptional()
  readonly password: string;
}

export const AccessTokenRequestSchema = Joi.object({
  type: Joi.string().required(),
  token: Joi.string().optional(),
  email: Joi.string()
    .email()
    .optional(),
  password: Joi.string().optional(),
});
