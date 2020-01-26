import { ApiProperty } from '@nestjs/swagger';

class LocationResponseDTO {
  @ApiProperty()
  readonly longitude: number;

  @ApiProperty()
  readonly latitude: number;
}

export class PlaceResponseDTO {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly rating: number;

  @ApiProperty({ type: LocationResponseDTO })
  readonly location: LocationResponseDTO;
}
