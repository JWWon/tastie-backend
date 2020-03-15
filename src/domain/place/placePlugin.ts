import {
  PlaceSearchResponse,
  PlaceDetailResponse,
  PlaceSearchParam,
} from './dto';
import { Coordinate } from '@/entities';
import { PlacePhoto } from './placePhoto';

export interface PlacePlugin {
  getAddress(param: Coordinate): Promise<string>;
  getPlaces(param: PlaceSearchParam): Promise<PlaceSearchResponse[]>;
  getPlaceDetailByPlaceID(placeID: string): Promise<PlaceDetailResponse>;
  getPhotoUrl(photo: PlacePhoto): Promise<string>;
  getPhotoUrls(photos: PlacePhoto[]): Promise<string[]>;
}

export const PlacePluginToken = Symbol();
