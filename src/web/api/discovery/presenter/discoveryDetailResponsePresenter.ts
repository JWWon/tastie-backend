import { ControllerPresenter } from '../../common/interface';
import { DiscoveryDetailResponse } from '../dto';
import { DiscoveryDetail } from '@/domain/discovery';

export class DiscoveryDetailResponsePresenter
  implements ControllerPresenter<DiscoveryDetailResponse> {
  constructor(private readonly detail: DiscoveryDetail) {}

  present(): DiscoveryDetailResponse {
    return {
      id: this.detail.placeID,
      name: this.detail.name,
      rating: this.detail.rating,
      userRatingsTotal: this.detail.userRatingsTotal,
      priceLevel: this.detail.priceLevel,
      types: this.detail.types,
      location: this.detail.coordinate,
      formattedAddress: this.detail.formattedAddress,
      formattedPhoneNumber: this.detail.formattedPhoneNumber,
      website: this.detail.website,
      openingHours: this.detail.openingHours,
      photoUrls: this.detail.photoUrls,
    };
  }
}
