import { RestaurantRecommender } from './restaurantRecommender';
import { Restaurant } from './model';
import { QueryRecommendRestaurantRequest } from './dto';
import { PlaceSearchResponse } from '@/domain/place';

export class RuleBasedRestaurantRecommender implements RestaurantRecommender {
  recommend(
    req: QueryRecommendRestaurantRequest,
    places: PlaceSearchResponse[],
  ): PlaceSearchResponse | undefined {
    if (places.length < 1) {
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

    const min = places.length > 3 ? 3 : places.length;
    const idx = randomInt(0, min);

    return places.sort(cmpFunc)[idx];
  }

  recommends(
    req: QueryRecommendRestaurantRequest,
    places: PlaceSearchResponse[],
  ): PlaceSearchResponse[] {
    const cmpFunc = (a: PlaceSearchResponse, b: PlaceSearchResponse) => {
      if (a.userRatingsTotal > b.userRatingsTotal) return -1;
      if (a.userRatingsTotal < b.userRatingsTotal) return 1;
      return 0;
    };

    let min = places.length;
    if (min > req.length) {
      min = req.length;
    }

    return places.sort(cmpFunc).slice(0, min);
  }
}
