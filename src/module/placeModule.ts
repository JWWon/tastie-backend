import { Module } from '@nestjs/common';
import { PlaceController } from '@/web/api/place/controller';
import { PlaceService, PlacePluginToken } from '@/domain/place';
import { GooglePlacePlugin } from '@/infrastructure/place/goolgePlacePlugin';

@Module({
  controllers: [PlaceController],
  providers: [
    PlaceService,
    { provide: PlacePluginToken, useClass: GooglePlacePlugin },
  ],
})
export class PlaceModule {}
