import { Module } from '@nestjs/common';
import { CaseService } from '@/domain/case';
import { GooglePlacePlugin } from '@/infrastructure/place/goolgePlacePlugin';
import { PlacePluginToken } from '@/domain/place';
import { PreferenceRepositoryToken } from '@/domain/case/preferenceRepository';
import { SituationRepositoryToken } from '@/domain/case/situationRepository';
import { CategoryRepositoryToken } from '@/domain/case/categoryRepository';
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
