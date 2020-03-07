import { Coordinate } from '@/entities';

export type PlaceResponse = {
  readonly id: string;
  readonly name: string;
  readonly rating: number;
  readonly userRatingsTotal: number;
  readonly location: Coordinate;
};
