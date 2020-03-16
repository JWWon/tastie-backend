import { Coordinate } from '@/entities';
import { PlaceOpeningHours } from '../placeOpeningHours';
import { PlacePhoto } from '../placePhoto';

export type PlaceDetailResponse = {
  readonly placeID: string;
  readonly name: string;
  readonly rating: number;
  readonly userRatingsTotal: number;
  readonly priceLevel: number;
  readonly types: string[];
  readonly coordinate: Coordinate;
  readonly formattedAddress: string;
  readonly formattedPhoneNumber?: string;
  readonly website?: string;
  readonly openingHours: PlaceOpeningHours;
  readonly photos: PlacePhoto[];
};
