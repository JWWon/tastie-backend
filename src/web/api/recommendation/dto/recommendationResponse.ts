import { ApiProperty } from '@nestjs/swagger';
import { OpeningHours } from './openingHours';
import { Coordinate } from '../../common/dto';

export class RecommendationResponse {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly rating: number;

  @ApiProperty()
  readonly userRatingsTotal: number;

  @ApiProperty()
  readonly priceLevel: number;

  @ApiProperty()
  readonly location: Coordinate;

  @ApiProperty()
  readonly photoUrl: string;
}
