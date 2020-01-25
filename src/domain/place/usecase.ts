import { Place, QueryPlaceRequest } from './dto';

export interface PlaceUsecase {
  getPlaces(req: QueryPlaceRequest): Promise<Place[]>;
}

export const PlaceUsecaseToken = Symbol();
