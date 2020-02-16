import { Location } from '@/domain/place/dto';

export type Category = {
  readonly id: string;
  readonly name: string;
};

export type Situation = {
  readonly id: string;
  readonly name: string;
};

export type Restaurant = {
  readonly id: string;
  readonly name: string;
  readonly rating: number;
  readonly userRatingsTotal: number;
  readonly location: Location;
};
