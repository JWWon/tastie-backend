import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryRestaurantRequest {
  @ApiPropertyOptional()
  readonly name: string;

  @ApiPropertyOptional()
  readonly status: string;

  @ApiPropertyOptional({ example: '[longitude,latitude]' })
  readonly coordinate: string;

  @ApiPropertyOptional({ default: 1, description: 'search radius *Unit km' })
  readonly withInKm: number;
}
