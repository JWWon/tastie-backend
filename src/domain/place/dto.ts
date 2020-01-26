export type QueryPlaceRequest = {
  readonly location: Location;
  readonly radius: number;
  readonly count: number;
};

export type Location = {
  readonly longitude: number;
  readonly latitude: number;
};

export type Place = {
  readonly id: string;
  readonly name: string;
  readonly rating: number;
  readonly userRatingsTotal: number;
  readonly location: Location;
};
