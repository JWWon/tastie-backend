import { Module } from '@nestjs/common';
import { DiscoveryController } from '@/web/api/discovery/discoveryController';
import {
  DiscoveryService,
  RuleBasedRecommender,
  DiscoveryRecommenderToken,
} from '@/domain/discovery';
import { PlacePluginToken } from '@/domain/place';
import { GooglePlaceV2Plugin } from '@/infrastructure/place/googlePlaceV2Plugin';
import { SituationRepositoryToken } from '@/domain/case/situationRepository';
import { MemorySituationRepository } from '@/infrastructure/repositories';

@Module({
  controllers: [DiscoveryController],
  providers: [
    DiscoveryService,
    {
      provide: DiscoveryRecommenderToken,
      useClass: RuleBasedRecommender,
    },
    {
      provide: SituationRepositoryToken,
      useClass: MemorySituationRepository,
    },
    { provide: PlacePluginToken, useClass: GooglePlaceV2Plugin },
  ],
})
export class DiscoveryModule {}
