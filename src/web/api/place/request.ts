import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class QueryRegionRequestDTO {
  @ApiProperty()
  readonly longitude: number;

  @ApiProperty()
  readonly latitude: number;

  @ApiPropertyOptional({
    type: Number,
    default: 3000,
  })
  readonly radius: number;

  @ApiPropertyOptional({
    default: 5,
  })
  readonly count: number;
}

export class QueryAddressRequestDTO {
  @ApiProperty()
  readonly longitude: number;

  @ApiProperty()
  readonly latitude: number;
}
