import { Coordinate } from './coordinate';

export type Place = {
  readonly placeID: string;
  readonly name: string;
  readonly rating: number;
  readonly userRatingsTotal: number;
  readonly coordinate: Coordinate;
};
