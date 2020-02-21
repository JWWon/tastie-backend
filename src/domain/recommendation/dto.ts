import { Coordinate } from '@/domain/coordinate/dto';
import { CategoryType, SituationType } from '@/entities';
import { PlaceOpeningHours } from '@/interfaces/place';

export type QueryRecommendRestaurantRequest = {
  readonly location: Coordinate;
  readonly category: CategoryType;
  readonly situation: SituationType;
};

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
