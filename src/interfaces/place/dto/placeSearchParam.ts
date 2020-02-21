import { Coordinate } from '@/entities';
import { PlaceType } from '../placeType';

export type PlaceSearchParam = {
  readonly coordinate: Coordinate;
  readonly radius?: number;
  readonly placeType: PlaceType;
  readonly keyword?: string;
};
