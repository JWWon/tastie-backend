import { QueryRecommendRestaurantRequest } from './dto';
import { PlaceSearchResponse } from '@/domain/place';

export interface RestaurantRecommender {
  recommend(
    req: QueryRecommendRestaurantRequest,
    places: PlaceSearchResponse[],
  ): PlaceSearchResponse;
  recommends(
    req: QueryRecommendRestaurantRequest,
    places: PlaceSearchResponse[],
  ): PlaceSearchResponse[];
}

export const RestaurantRecommenderToken = Symbol();
