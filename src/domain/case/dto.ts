import { CategoryType } from '@/entities';

export type QueryCategoryRequest = {
  readonly utcNow: Date;
};

export type QuerySituationRequest = {
  readonly category: CategoryType;
};

export type QueryPreferencesRequest = {
  readonly situation: string;
};

export type Coordinate = {
  readonly longitude: number;
  readonly latitude: number;
};

export type QueryPlaceRequest = {
  readonly location: Coordinate;
  readonly radius: number;
  readonly count: number;
};

export type PreferencesResponse = {
  readonly name: string;
};

export type PlaceResponse = {
  readonly id: string;
  readonly name: string;
  readonly rating: number;
  readonly userRatingsTotal: number;
  readonly location: Coordinate;
};
