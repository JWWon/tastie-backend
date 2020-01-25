import { Location, Place } from './dto';

export interface PlacePlugin {
  getTouristAttractionPlaces(Location): Promise<Place[]>;
}

export const PlacePluginToken = Symbol();
