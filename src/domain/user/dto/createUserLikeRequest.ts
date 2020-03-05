export type CreateUserLikeRequest = {
  readonly userID: number;
  readonly placeID: string;
  readonly positive: boolean;
};
