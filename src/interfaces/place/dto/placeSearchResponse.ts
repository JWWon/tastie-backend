import { Coordinate } from '@/entities';

export type PlaceSearchResponse = {
  readonly placeID: string;
  readonly name: string;
  readonly rating: number;
  readonly userRatingsTotal: number;
  readonly priceLevel: number;
  readonly types: string[];
  readonly coordinate: Coordinate;
};
