import { Coordinate } from '@/entities';

export interface QueryRestaurantRequest {
  readonly name?: string;
  readonly status?: string;
  readonly coordinate?: Coordinate;
  readonly withInKm: number;
}
