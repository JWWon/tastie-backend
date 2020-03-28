import { Discovery } from '@/domain/discovery';
import { DiscoveryResponse } from '../dto';
import { ControllerPresenter } from '../../common/interface';

export class DiscoveryResponsePresenter
  implements ControllerPresenter<DiscoveryResponse[]> {
  constructor(private readonly recommendation: Discovery[]) {}

  present(): DiscoveryResponse[] {
    return this.recommendation.map(
      (res: Discovery): DiscoveryResponse => {
        return {
          id: res.placeID,
          name: res.name,
          priceLevel: res.priceLevel,
          rating: res.rating,
          userRatingsTotal: res.userRatingsTotal,
          photoUrl: res.photoUrl,
          location: res.coordinate,
          address: res.address,
        };
      },
    );
  }
}
