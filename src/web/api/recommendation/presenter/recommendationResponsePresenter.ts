import { RestaurantResponse } from '@/domain/recommendation';
import { RecommendationResponse } from '../dto';

interface ControllerPresenter<T> {
  present(): T;
}

const fromRestaurantResponse = (
  res: RestaurantResponse,
): RecommendationResponse => {
  const { placeID, name, priceLevel, rating, userRatingsTotal, photoUrl } = res;
  return {
    id: placeID,
    name,
    priceLevel,
    rating,
    userRatingsTotal,
    photoUrl,
    location: undefined,
    openingHours: undefined,
  };
};

export class RecommendationResponsePresenter
  implements ControllerPresenter<RecommendationResponse[]> {
  constructor(private readonly recommendation: RestaurantResponse[]) {}

  present(): RecommendationResponse[] {
    return this.recommendation.map(fromRestaurantResponse);
  }
}
