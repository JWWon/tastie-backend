import { ApiProperty } from '@nestjs/swagger';

export class LocationResponseDTO {
  @ApiProperty()
  readonly longitude: number;

  @ApiProperty()
  readonly latitude: number;
}
