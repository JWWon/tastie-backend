import { ApiProperty } from '@nestjs/swagger';

export class QueryRegionRequestDTO {
  @ApiProperty()
  readonly longitude: number;

  @ApiProperty()
  readonly latitude: number;
}
