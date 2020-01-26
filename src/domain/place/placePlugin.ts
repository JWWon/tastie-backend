import { Location, Place } from './dto';

export interface PlacePlugin {
  getRestaurants(Location): Promise<Place[]>;
  getTouristAttractionPlaces(Location, radius: number): Promise<Place[]>;
}

export const PlacePluginToken = Symbol();
