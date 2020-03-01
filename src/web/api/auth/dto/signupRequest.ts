import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AccessTokenRequest } from './accessTokenRequest';

export class SignupRequest extends AccessTokenRequest {
  @ApiProperty({ description: 'Max length 20' })
  readonly name: string;

  @ApiPropertyOptional()
  readonly birthYear?: number;
}
