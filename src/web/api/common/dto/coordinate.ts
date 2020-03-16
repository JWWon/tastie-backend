import { ApiProperty } from '@nestjs/swagger';

export class Coordinate {
  @ApiProperty()
  readonly longitude: number;

  @ApiProperty()
  readonly latitude: number;
}
