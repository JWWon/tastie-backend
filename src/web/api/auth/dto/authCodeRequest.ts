import { ApiProperty } from '@nestjs/swagger';

export class AuthCodeRequest {
  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly redirect: string;
}
