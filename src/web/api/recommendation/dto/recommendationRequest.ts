import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SituationTypeList, CategoryTypeList } from '@/entities';

export class RecommendationRequest {
  @ApiProperty()
  readonly longitude: number;

  @ApiProperty()
  readonly latitude: number;

  @ApiProperty({ enum: CategoryTypeList })
  readonly category: string;

  @ApiProperty({ enum: SituationTypeList })
  readonly situation: string;

  @ApiPropertyOptional({ default: 5 })
  readonly length?: number;
}
