import { Coordinate, CategoryType, SituationType } from '@/entities';

export type QueryDiscoveryRequest = {
  readonly location: Coordinate;
  readonly category: CategoryType;
  readonly situation: SituationType;
  readonly length: number;
};
