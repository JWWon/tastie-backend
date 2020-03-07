import { Coordinate } from '@/entities';

export type QueryPlaceRequest = {
  readonly location: Coordinate;
  readonly radius: number;
  readonly count: number;
};
