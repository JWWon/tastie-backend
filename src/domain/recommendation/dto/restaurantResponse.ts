import { Coordinate } from '@/entities';

export interface RestaurantResponse {
  readonly placeID: string;
  readonly name: string;
  readonly rating: number;
  readonly userRatingsTotal: number;
  readonly priceLevel: number;
  readonly photoUrl: string;
  readonly coordinate: Coordinate;
}
