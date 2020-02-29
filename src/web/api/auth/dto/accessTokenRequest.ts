import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export const AuthTypeList = ['email', 'google', 'facebook'];
type AuthType = typeof AuthTypeList[number];

export class AccessTokenRequest {
  @ApiProperty({ description: 'Auth Type', enum: AuthTypeList })
  readonly type: AuthType;

  @ApiPropertyOptional({
    description: 'social accessToken, require field when social auth',
  })
  readonly token: string;

  @ApiPropertyOptional({ description: 'require field when email auth' })
  readonly email: string;

  @ApiPropertyOptional({ description: 'require field when email auth' })
  readonly password: string;
}
