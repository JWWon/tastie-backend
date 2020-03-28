import { ApiProperty } from '@nestjs/swagger';
import { OpeningHours } from './openingHours';
import { Coordinate } from '../../common/dto';

export class DiscoveryDetailResponse {
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

  @ApiProperty()
  readonly location: Coordinate;

  @ApiProperty()
  readonly formattedAddress: string;

  @ApiProperty()
  readonly formattedPhoneNumber?: string;

  @ApiProperty()
  readonly website?: string;

  @ApiProperty()
  readonly photoUrls: string[];

  @ApiProperty()
  readonly openingHours: OpeningHours;
}
