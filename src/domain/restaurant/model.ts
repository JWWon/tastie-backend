import { TimeSlot } from './model/timeSlot';
import { Location } from '@/domain/place/dto';

export type Category = {
  readonly id: string;
  readonly name: string;
  readonly priorities: TimeSlot[];
};

export type Situation = {
  readonly id: string;
  readonly name: string;
  readonly priorities: TimeSlot[];
};

export type Restaurant = {
  readonly id: string;
  readonly name: string;
  readonly rating: number;
  readonly userRatingsTotal: number;
  readonly location: Location;
};
