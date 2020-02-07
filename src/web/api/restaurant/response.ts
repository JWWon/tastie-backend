import { ApiProperty } from '@nestjs/swagger';
import { LocationResponseDTO } from '../common/response';

export class CategoryResponseDTO {
  @ApiProperty()
  readonly name: string;
}

export class SituationResponseDTO {
  @ApiProperty()
  readonly name: string;
}

export class PlaceOpeningHoursDTO {
  @ApiProperty()
  readonly openNow?: boolean;

  @ApiProperty()
  readonly weekdayText: string[];
}

export class RestaurantResponseDTO {
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

  @ApiProperty({ type: LocationResponseDTO })
  readonly location: LocationResponseDTO;

  @ApiProperty()
  readonly formattedAddress: string;

  @ApiProperty()
  readonly formattedPhoneNumber?: string;

  @ApiProperty()
  readonly website?: string;

  @ApiProperty()
  readonly photoUrls: string[];

  @ApiProperty()
  readonly openingHours: PlaceOpeningHoursDTO;
}
