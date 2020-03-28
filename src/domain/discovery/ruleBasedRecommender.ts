import { DiscoveryRecommender } from './discoveryRecommender';
import { QueryDiscoveryRequest } from './dto';
import { PlaceSearchResponse } from '@/domain/place';

export class RuleBasedRecommender implements DiscoveryRecommender {
  recommends(
    req: QueryDiscoveryRequest,
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
