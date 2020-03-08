import { Module } from '@nestjs/common';
import { CaseService } from '@/domain/case';
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
import { CaseController } from '@/web/api/case/controller';

@Module({
  controllers: [CaseController],
  providers: [
    CaseService,
    { provide: PlacePluginToken, useClass: GooglePlacePlugin },
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
  ],
})
export class CaseModule {}