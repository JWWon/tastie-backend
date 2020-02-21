export type QueryAddressRequest = {
  readonly longitude: number;
  readonly latitude: number;
};

export type Coordinate = {
  readonly longitude: number;
  readonly latitude: number;
};

export type Location = {
  readonly id: string;
  readonly name: string;
  readonly rating: number;
  readonly userRatingsTotal: number;
  readonly location: Coordinate;
};
