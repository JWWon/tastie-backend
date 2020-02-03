import { Location } from '@/domain/place/dto';

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
