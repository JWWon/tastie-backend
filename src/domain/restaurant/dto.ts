import { Location } from '@/domain/place/dto';
import { PlaceOpeningHours } from '../place/placePlugin';

export type QueryCategoryRequest = {
  readonly utcNow: Date;
};

export type QuerySituationRequest = {
  readonly utcNow: Date;
};

export type QueryRecommendRestaurantRequest = {
  readonly location: Location;
  readonly category: string;
  readonly situation: string;
};

export type RestaurantDetailResponse = {
  readonly placeID: string;
  readonly name: string;
  readonly rating: number;
  readonly userRatingsTotal: number;
  readonly priceLevel: number;
  readonly types: string[];
  readonly location: Location;
  readonly formattedAddress: string;
  readonly formattedPhoneNumber?: string;
  readonly website?: string;
  readonly openingHours: PlaceOpeningHours;
  readonly photoReference: string[];
};
