/* eslint-disable no-restricted-syntax */
import { Inject } from '@nestjs/common';
import { QueryDiscoveryRequest, DiscoveryDetail, Discovery } from './dto';
import {
  PlacePluginToken,
  PlacePlugin,
  PlaceDetailResponse,
  PlaceSearchResponse,
} from '@/domain/place';
import { DiscoveryFinder } from './discoveryFinder';
import {
  DiscoveryRecommenderToken,
  DiscoveryRecommender,
} from './discoveryRecommender';
import {
  SituationRepositoryToken,
  SituationRepository,
} from '../case/situationRepository';

export class DiscoveryService {
  constructor(
    @Inject(PlacePluginToken)
    private readonly placePlugin: PlacePlugin,
    @Inject(DiscoveryRecommenderToken)
    private readonly discoveryRecommender: DiscoveryRecommender,
    @Inject(SituationRepositoryToken)
    private readonly situationRepo: SituationRepository,
  ) {}

  async mergePhotos(detail: PlaceDetailResponse): Promise<DiscoveryDetail> {
    if (detail === undefined) {
      return undefined;
    }

    return {
      ...detail,
      photoUrls: await this.placePlugin.getPhotoUrls(detail.photos),
    };
  }

  async assignPhotoInRecommendations(
    recommended: PlaceSearchResponse[],
  ): Promise<Discovery[]> {
    const tasks = [];
    for (const recommend of recommended) {
      tasks.push(
        this.placePlugin
          .getPhotoUrl(
            recommend.photos.length > 0 ? recommend.photos[0] : undefined,
          )
          .then(url => {
            return {
              ...recommend,
              photoUrl: url,
            };
          }),
      );
    }

    const res = await Promise.all(tasks);
    return res;
  }

  async getDiscoveries(req: QueryDiscoveryRequest): Promise<Discovery[]> {
    const foodKeywords = this.situationRepo.getFoodKeywordsBySituation(
      req.situation,
    );

    const restaurantFinder = new DiscoveryFinder(this.placePlugin);
    const places = await restaurantFinder.find({
      ...req,
      foodKeywords,
    });

    const recommendations = this.discoveryRecommender.recommends(req, places);
    const restaurants = await this.assignPhotoInRecommendations(
      recommendations,
    );

    return restaurants;
  }

  async getDiscoveryByPlaceID(
    placeID: string,
  ): Promise<DiscoveryDetail | undefined> {
    try {
      const recommendation = await this.placePlugin.getPlaceDetailByPlaceID(
        placeID,
      );

      return this.mergePhotos(recommendation);
    } catch (err) {
      return undefined;
    }
  }
}
