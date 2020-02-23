import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenResponse {
  @ApiProperty()
  readonly type: string;

  @ApiProperty()
  readonly accessToken: string;

  @ApiProperty()
  readonly expiresIn: number;
}
