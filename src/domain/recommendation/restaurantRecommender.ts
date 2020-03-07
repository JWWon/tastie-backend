import { Restaurant } from '../model';
import { QueryRecommendRestaurantRequest } from '..';
import { PlaceDetailResponse } from '@/interfaces/place';

export interface RestaurantRecommender {
  recommend(
    req: QueryRecommendRestaurantRequest,
    restaurants: Restaurant[],
  ): Restaurant;
  recommends(
    req: QueryRecommendRestaurantRequest,
    restaurants: PlaceDetailResponse[],
  ): PlaceDetailResponse[];
}

export const RestaurantRecommenderToken = Symbol();
