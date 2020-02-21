import { Coordinate } from './dto';

export type QueryRestaurantParam = {
  location: Coordinate;
  category: string;
  situation: string;
};

export type PlaceType = 'restaurant' | 'cafe' | 'bar' | 'tourist_attraction';
export type QueryPlacesParam = {
  readonly location: Coordinate;
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
  readonly location: Coordinate;
};

export type PlaceOpeningHours = {
  readonly openNow?: boolean;
  readonly weekdayText: string[];
};

export type PlacePhoto = {
  readonly reference: string;
  readonly width: number;
  readonly height: number;
  url: string;
};

export type PlaceDetailResponse = {
  readonly placeID: string;
  readonly name: string;
  readonly rating: number;
  readonly userRatingsTotal: number;
  readonly priceLevel: number;
  readonly types: string[];
  readonly location: Coordinate;
  readonly formattedAddress: string;
  readonly formattedPhoneNumber?: string;
  readonly website?: string;
  readonly openingHours: PlaceOpeningHours;
  readonly photos: PlacePhoto[];
};

export interface PlacePlugin {
  getAddress(param: Coordinate): Promise<string>;
  getPlaces(param: QueryPlacesParam): Promise<PlaceQueryResponse[]>;
  getPlaceDetailByPlaceID(placeID: string): Promise<PlaceDetailResponse>;
  getPhotoUrls(photos: PlacePhoto[]): Promise<string[]>;
}

export const PlacePluginToken = Symbol();
