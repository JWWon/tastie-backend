import { Module } from '@nestjs/common';
import { RecommendationController } from '@/web/api/recommendation/recommendationController';
import {
  RecommendationService,
  RuleBasedRestaurantRecommender,
  RestaurantRecommenderToken,
} from '@/domain/recommendation';
import { GooglePlacePlugin } from '@/infrastructure/place/goolgePlacePlugin';
import { PlacePluginToken } from '@/domain/place';
import {
  CategoryRepositoryToken,
  SituationRepositoryToken,
  PreferenceRepositoryToken,
} from '@/interfaces/repositories';
import {
  MemoryCategoryRepository,
  MemorySituationRepository,
  MemoryPreferenceRepository,
} from '@/infrastructure/repositories';
import { GooglePlaceV2Plugin } from '@/infrastructure/place/googlePlaceV2Plugin';

@Module({
  controllers: [RecommendationController],
  providers: [
    RecommendationService,
    {
      provide: RestaurantRecommenderToken,
      useClass: RuleBasedRestaurantRecommender,
    },
    {
      provide: CategoryRepositoryToken,
      useClass: MemoryCategoryRepository,
    },
    {
      provide: SituationRepositoryToken,
      useClass: MemorySituationRepository,
    },
    {
      provide: PreferenceRepositoryToken,
      useClass: MemoryPreferenceRepository,
    },
    { provide: PlacePluginToken, useClass: GooglePlaceV2Plugin },
  ],
})
export class RecommendationModule {}
