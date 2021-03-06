import { Inject } from '@nestjs/common';
import {
  CategoryRepositoryToken,
  CategoryRepository,
} from './categoryRepository';
import {
  QueryCategoryRequest,
  QuerySituationRequest,
  QueryPreferenceRequest,
  PreferencesResponse,
  QueryPlaceRequest,
  PlaceResponse,
} from './dto';
import { Category, Situation } from '@/entities';
import {
  PlacePluginToken,
  PlacePlugin,
  PlaceSearchResponse,
} from '@/domain/place';
import {
  SituationRepository,
  SituationRepositoryToken,
} from './situationRepository';
import {
  PreferenceRepositoryToken,
  PreferenceRepository,
} from './preferenceRepository';

export class CaseService {
  constructor(
    @Inject(CategoryRepositoryToken)
    private readonly categoryRepository: CategoryRepository,
    @Inject(SituationRepositoryToken)
    private readonly situationRepository: SituationRepository,
    @Inject(PreferenceRepositoryToken)
    private readonly preferenceRepository: PreferenceRepository,
    @Inject(PlacePluginToken)
    private readonly placePlugin: PlacePlugin,
  ) {}

  async getCategories(req: QueryCategoryRequest): Promise<Category[]> {
    const categories = await this.categoryRepository.getCategories();
    return categories;
  }

  async getSituations(req: QuerySituationRequest): Promise<Situation[]> {
    const situations = this.situationRepository.getSituationsByCategory(
      req.category,
    );

    return situations;
  }

  async getPreferences(
    req: QueryPreferenceRequest,
  ): Promise<PreferencesResponse[]> {
    const preferences = this.preferenceRepository.getPreferences();
    return preferences;
  }

  async getPlaces(req: QueryPlaceRequest): Promise<PlaceResponse[]> {
    const placeResponse = await this.placePlugin.getPlaces({
      coordinate: req.location,
      radius: req.radius,
      placeType: 'tourist_attraction',
    });

    const convert = (res: PlaceSearchResponse): PlaceResponse => {
      return {
        id: res.placeID,
        name: res.name,
        location: res.coordinate,
        rating: res.rating,
        userRatingsTotal: res.userRatingsTotal,
      };
    };

    const places = placeResponse.map(convert);
    const cmpFunc = (a: PlaceResponse, b: PlaceResponse) => {
      if (a.userRatingsTotal > b.userRatingsTotal) return -1;
      if (a.userRatingsTotal < b.userRatingsTotal) return 1;
      return 0;
    };

    return places.sort(cmpFunc).splice(0, req.count);
  }
}
