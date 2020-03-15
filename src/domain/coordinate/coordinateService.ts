import { Inject, Injectable } from '@nestjs/common';
import { PlacePlugin, PlacePluginToken } from '@/domain/place';
import { QueryAddressRequest } from '@/domain/coordinate/dto';

@Injectable()
export class CoordinateService {
  constructor(
    @Inject(PlacePluginToken)
    private readonly placePlugin: PlacePlugin,
  ) {}

  async getAddress(req: QueryAddressRequest): Promise<string> {
    const address = await this.placePlugin.getAddress(req);
    return address;
  }
}
