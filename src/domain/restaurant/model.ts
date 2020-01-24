import { TimeSlot } from './model/timeSlot';

export type Category = {
  readonly id: string;
  readonly name: string;
  readonly priorities: TimeSlot[];
};

export type Situation = {
  readonly id: string;
  readonly name: string;
};

export type Restaurant = {};
