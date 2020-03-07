import { Module } from '@nestjs/common';
import { RestaurantController } from '@/web/api/recommendation/controller';
import {
  RecommendationService,
  RuleBasedRestaurantRecommender,
  RestaurantRecommenderToken,
} from '@/domain/recommendation';
import { GooglePlacePlugin } from '@/infrastructure/place/goolgePlacePlugin';
import { PlacePluginToken } from '@/interfaces/place';
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

@Module({
  controllers: [RestaurantController],
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
    { provide: PlacePluginToken, useClass: GooglePlacePlugin },
  ],
})
export class RecommendationModule {}
