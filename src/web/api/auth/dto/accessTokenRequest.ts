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
