import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Optional } from '@nestjs/common';
import { CategoryTypeList, SituationTypeList } from '@/entities';

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

export class QuerySituationRequestDTO {
  @ApiProperty({ enum: CategoryTypeList })
  readonly category: string;
}

export class QueryPreferencesRequestDTO {
  @ApiProperty({ enum: SituationTypeList })
  readonly situation: string;
}
