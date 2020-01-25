import { Module } from '@nestjs/common';
import { PlaceController } from '../web/api/place/controller';
import { PlaceUsecaseToken } from '@/domain/place/usecase';
import { PlaceService } from '@/domain/place/service';
import { PlacePluginToken } from '@/domain/place/placePlugin';
import { GooglePlacePlugin } from '@/domain/place/googlePlacePlugin';

@Module({
  controllers: [PlaceController],
  providers: [
    { provide: PlaceUsecaseToken, useClass: PlaceService },
    { provide: PlacePluginToken, useClass: GooglePlacePlugin },
  ],
})
export class PlaceModule {}
