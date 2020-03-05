import { ApiProperty } from '@nestjs/swagger';

export class CreateUserPlaceLikeRequest {
  @ApiProperty()
  readonly placeID: string;

  @ApiProperty()
  readonly positive: boolean;
}
