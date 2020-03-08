/* eslint-disable no-restricted-syntax */
import { Inject } from '@nestjs/common';
import {
  QueryRecommendRestaurantRequest,
  RestaurantDetailResponse,
} from './dto';
import {
  PlacePluginToken,
  PlacePlugin,
  PlaceDetailResponse,
} from '@/interfaces/place';
import {
  SituationRepositoryToken,
  SituationRepository,
} from '@/interfaces/repositories';
import { RestaurantFinder } from './restaurantFinder';
import {
  RestaurantRecommenderToken,
  RestaurantRecommender,
} from './restaurantRecommender';

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

  async getRecommendations(
    req: QueryRecommendRestaurantRequest,
  ): Promise<RestaurantDetailResponse[]> {
    const foodKeywords = this.situationRepo.getFoodKeywordsBySituation(
      req.situation,
    );

    const restaurantFinder = new RestaurantFinder(this.placePlugin);
    const places = await restaurantFinder.find({
      ...req,
      foodKeywords,
    });

    const recommended = this.restaurantRecommender.recommends(req, places);
    const detailRecommendations = await this.convertPlacesToDetail(recommended);

    const result = await Promise.all(
      detailRecommendations.map(recommendation =>
        this.mergePhotos(recommendation),
      ),
    );

    return result;
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

  async getRecommendRestaurant(
    req: QueryRecommendRestaurantRequest,
  ): Promise<RestaurantDetailResponse | undefined> {
    const foodKeywords = this.situationRepo.getFoodKeywordsBySituation(
      req.situation,
    );

    const restaurantFinder = new RestaurantFinder(this.placePlugin);
    const places = await restaurantFinder.find({
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