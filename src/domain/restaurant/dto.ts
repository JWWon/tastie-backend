import { Coordinate } from '@/domain/coordinate/dto';
import { PlaceOpeningHours } from '../coordinate/placePlugin';
import { CategoryType, SituationType } from '@/entities';

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
  readonly location: Coordinate;
  readonly formattedAddress: string;
  readonly formattedPhoneNumber?: string;
  readonly website?: string;
  readonly openingHours: PlaceOpeningHours;
  readonly photoUrls: string[];
};
