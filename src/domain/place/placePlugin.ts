import { Location, Place } from './dto';

export interface PlacePlugin {
  getTouristAttractionPlaces(Location, radius: number): Promise<Place[]>;
}

export const PlacePluginToken = Symbol();
