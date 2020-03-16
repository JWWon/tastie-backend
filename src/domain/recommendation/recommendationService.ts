/* eslint-disable no-restricted-syntax */
import { Inject } from '@nestjs/common';
import {
  QueryRecommendRestaurantRequest,
  RestaurantDetailResponse,
  RestaurantResponse,
} from './dto';
import {
  PlacePluginToken,
  PlacePlugin,
  PlaceDetailResponse,
  PlaceSearchResponse,
} from '@/domain/place';
import { RestaurantFinder } from './restaurantFinder';
import {
  RestaurantRecommenderToken,
  RestaurantRecommender,
} from './restaurantRecommender';
import {
  SituationRepositoryToken,
  SituationRepository,
} from '../case/situationRepository';

export class RecommendationService {
  constructor(
    @Inject(PlacePluginToken)
    private readonly placePlugin: PlacePlugin,
    @Inject(RestaurantRecommenderToken)
    private readonly restaurantRecommender: RestaurantRecommender,
    @Inject(SituationRepositoryToken)
    private readonly situationRepo: SituationRepository,
  ) {}

  async convertPlacesToDetail(
    places: { placeID: string }[],
  ): Promise<PlaceDetailResponse[]> {
    const tasks = [];
    for (const place of places) {
      tasks.push(this.placePlugin.getPlaceDetailByPlaceID(place.placeID));
    }

    const detailPlaces = await Promise.all(tasks);
    return detailPlaces;
  }

  async mergePhotos(
    detail: PlaceDetailResponse,
  ): Promise<RestaurantDetailResponse> {
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
  ): Promise<RestaurantResponse[]> {
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

  async getRecommendations(
    req: QueryRecommendRestaurantRequest,
  ): Promise<RestaurantResponse[]> {
    const foodKeywords = this.situationRepo.getFoodKeywordsBySituation(
      req.situation,
    );

    const restaurantFinder = new RestaurantFinder(this.placePlugin);
    const places = await restaurantFinder.find({
      ...req,
      foodKeywords,
    });

    const recommendations = this.restaurantRecommender.recommends(req, places);
    const restaurants = await this.assignPhotoInRecommendations(
      recommendations,
    );

    return restaurants;
  }

  async getRecommendationByPlaceID(
    placeID: string,
  ): Promise<RestaurantDetailResponse | undefined> {
    try {
      const recommendation = await this.placePlugin.getPlaceDetailByPlaceID(
        placeID,
      );

      return this.mergePhotos(recommendation);
    } catch (err) {
      return undefined;
    }
  }

  // deprecated api
  async getRecommendRestaurant(
    req: QueryRecommendRestaurantRequest,
  ): Promise<RestaurantDetailResponse | undefined> {
    const foodKeywords = this.situationRepo.getFoodKeywordsBySituation(
      req.situation,
    );

    const restaurantFinder = new RestaurantFinder(this.placePlugin);
    const places = await restaurantFinder.find({
      situation: req.situation,
      category: req.category,
      location: req.location,
      foodKeywords,
    });

    if (places.length <= 0) {
      return undefined;
    }

    const openFilter = (detailPlace: PlaceDetailResponse): boolean =>
      detailPlace.openingHours?.openNow === true;
    const restaurants = (await this.convertPlacesToDetail(places)).filter(
      openFilter,
    );
    const recommendRestaurant = this.restaurantRecommender.recommend(
      req,
      restaurants,
    );

    const restaurantDetailInfo = await this.placePlugin.getPlaceDetailByPlaceID(
      recommendRestaurant.placeID,
    );

    return {
      ...restaurantDetailInfo,
      photoUrls: await this.placePlugin.getPhotoUrls(
        restaurantDetailInfo.photos,
      ),
    };
  }
}
