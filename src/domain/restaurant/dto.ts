import { Location } from '@/domain/place/dto';

export type QueryCategoryRequest = {
  readonly utcNow: Date;
};

export type QuerySituationRequest = {};

export type QueryRecommendRestaurantRequest = {
  readonly location: Location;
};
