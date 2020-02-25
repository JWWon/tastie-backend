import { ApiProperty } from '@nestjs/swagger';
import { AccessTokenRequest } from './accessTokenRequest';

export class SignupRequest extends AccessTokenRequest {
  @ApiProperty()
  readonly username: string;
}
