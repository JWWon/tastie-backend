import { RestaurantRecommender } from './restaurantRecommender';
import { Restaurant } from '../model';
import { QueryRecommendRestaurantRequest } from '..';
import { PlaceDetailResponse } from '@/interfaces/place';

export class RuleBasedRestaurantRecommender implements RestaurantRecommender {
  recommend(
    req: QueryRecommendRestaurantRequest,
    restaurants: Restaurant[],
  ): Restaurant | undefined {
    if (restaurants.length < 1) {
      return undefined;
    }

    const cmpFunc = (a: Restaurant, b: Restaurant) => {
      if (a.userRatingsTotal > b.userRatingsTotal) return -1;
      if (a.userRatingsTotal < b.userRatingsTotal) return 1;
      return 0;
    };

    const randomInt = (low: number, high: number): number => {
      return Math.floor(Math.random() * (high - low) + low);
    };

    const min = restaurants.length > 3 ? 3 : restaurants.length;
    const idx = randomInt(0, min);

    return restaurants.sort(cmpFunc)[idx];
  }

  recommends(
    req: QueryRecommendRestaurantRequest,
    restaurants: PlaceDetailResponse[],
  ): PlaceDetailResponse[] {
    const cmpFunc = (a: Restaurant, b: Restaurant) => {
      if (a.userRatingsTotal > b.userRatingsTotal) return -1;
      if (a.userRatingsTotal < b.userRatingsTotal) return 1;
      return 0;
    };

    let min = restaurants.length;
    if (min > req.length) {
      min = req.length;
    }

    return restaurants.sort(cmpFunc).slice(0, min);
  }
}
