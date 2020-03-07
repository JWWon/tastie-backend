import { Coordinate } from '@/entities';

export type Restaurant = {
  readonly placeID: string;
  readonly name: string;
  readonly rating: number;
  readonly userRatingsTotal: number;
  readonly coordinate: Coordinate;
};
