import { QueryDiscoveryRequest } from './dto';
import { PlaceSearchResponse } from '@/domain/place';

export interface DiscoveryRecommender {
  recommends(
    req: QueryDiscoveryRequest,
    places: PlaceSearchResponse[],
  ): PlaceSearchResponse[];
}

export const DiscoveryRecommenderToken = Symbol();
