import { Location, Place } from './dto';

export type QueryRestaurantParam = {
  location: Location;
  category: string;
  situation: string;
};

export type PlaceType = 'restaurant' | 'cafe' | 'bar' | 'tourist_attraction';
export type QueryPlacesParam = {
  readonly location: Location;
  readonly radius?: number;
  readonly placeType: PlaceType;
  readonly keyword?: string;
};

export type PlaceQueryResponse = {
  readonly placeID: string;
  readonly name: string;
  readonly rating: number;
  readonly userRatingsTotal: number;
  readonly priceLevel: number;
  readonly types: string[];
  readonly location: Location;
};

export interface PlacePlugin {
  getPlaces(param: QueryPlacesParam): Promise<PlaceQueryResponse[]>;
  // getPlaceDetailByPlaceID(placeID: string): Promise<Place>;
}

export const PlacePluginToken = Symbol();
