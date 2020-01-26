import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { Optional } from '@nestjs/common';

export class QueryCategoryRequestDTO {
  @Optional()
  @ApiPropertyOptional({
    type: Date,
    description: 'UTC datetime based Iso8601Literal format',
    example: '2018-11-21T06:20:32.232Z',
    default: 'current datetime',
  })
  readonly now: Date;
}

export class RecommendRestaurantRequestDTO {
  @ApiProperty()
  readonly longitude: number;

  @ApiProperty()
  readonly latitude: number;

  @ApiProperty()
  readonly category: string;

  @ApiProperty()
  readonly situation: string;
}
