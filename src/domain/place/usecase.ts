import { Location, Place } from './dto';

export interface PlaceUsecase {
  getPlaces(req: Location): Promise<Place[]>;
}

export const PlaceUsecaseToken = Symbol();
