import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryRestaurantRequest {
  @ApiPropertyOptional()
  readonly name: string;

  @ApiPropertyOptional()
  readonly status: string;
}
