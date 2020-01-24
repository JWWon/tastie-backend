import { ApiPropertyOptional } from '@nestjs/swagger';
import { Optional } from '@nestjs/common';

export class QueryCategoryRequestDTO {
  @Optional()
  @ApiPropertyOptional({
    type: Date,
    description: 'utc date',
    example: '2018-11-21T06:20:32.232Z',
    default: true,
  })
  readonly now: Date;
}

export class RecommendRestaurantRequestDTO {}
