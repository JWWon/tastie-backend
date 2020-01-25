import { PlaceUsecase } from './usecase';

export class PlaceService implements PlaceUsecase {
  async getPlaces(): Promise<void> {
    console.log('Hello');
  }
}
