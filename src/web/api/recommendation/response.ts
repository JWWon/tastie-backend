import { ApiProperty } from '@nestjs/swagger';
import { CoordinateResponseDTO } from '../common/response';

export class OpeningHoursDTO {
  @ApiProperty()
  readonly openNow?: boolean;

  @ApiProperty()
  readonly weekdayText: string[];
}

export class RecommendationResponseDTO {
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
  readonly types: string[];

  @ApiProperty({ type: CoordinateResponseDTO })
  readonly location: CoordinateResponseDTO;

  @ApiProperty()
  readonly formattedAddress: string;

  @ApiProperty()
  readonly formattedPhoneNumber?: string;

  @ApiProperty()
  readonly website?: string;

  @ApiProperty()
  readonly photoUrls: string[];

  @ApiProperty()
  readonly openingHours: OpeningHoursDTO;
}
