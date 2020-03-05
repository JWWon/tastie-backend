import { ApiProperty } from '@nestjs/swagger';

export class UserPlaceLikeResponse {
  @ApiProperty()
  readonly placeID: string;

  @ApiProperty()
  readonly positive: boolean;
}
