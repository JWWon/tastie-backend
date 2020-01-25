export interface PlaceUsecase {
  getPlaces(): Promise<void>;
}

export const PlaceUsecaseToken = Symbol.toString();
