import { Coordinate } from '@/entities';
import { PlacePhoto } from '../placePhoto';

export type PlaceSearchResponse = {
  readonly placeID: string;
  readonly name: string;
  readonly rating: number;
  readonly userRatingsTotal: number;
  readonly priceLevel: number;
  readonly types: string[];
  readonly photos: PlacePhoto[];
  readonly coordinate: Coordinate;
};
