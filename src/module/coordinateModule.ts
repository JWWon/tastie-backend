import { Module } from '@nestjs/common';
import { PlaceController } from '@/web/api/coordinate/controller';
import { CoordinateService, PlacePluginToken } from '@/domain/coordinate';
import { GooglePlacePlugin } from '@/infrastructure/place/goolgePlacePlugin';

@Module({
  controllers: [PlaceController],
  providers: [
    CoordinateService,
    { provide: PlacePluginToken, useClass: GooglePlacePlugin },
  ],
})
export class CoordinateModule {}
