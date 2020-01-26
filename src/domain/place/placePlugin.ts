import { Location, Place } from './dto';

export type QueryRestaurantParam = {
  location: Location;
  category: string;
  situation: string;
};

export interface PlacePlugin {
  getRestaurants(param: QueryRestaurantParam): Promise<Place[]>;
  getTouristAttractionPlaces(
    location: Location,
    radius: number,
  ): Promise<Place[]>;
}

export const PlacePluginToken = Symbol();
