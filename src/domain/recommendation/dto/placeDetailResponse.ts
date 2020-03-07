import { PlaceOpeningHours } from '@/interfaces/place';
import { Coordinate } from '@/entities';

export type RestaurantDetailResponse = {
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
  readonly photoUrls: string[];
};
