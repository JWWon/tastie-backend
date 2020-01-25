import { Module } from '@nestjs/common';
import { PlaceController } from '../web/api/place/controller';
import { PlaceUsecaseToken } from '@/domain/place/usecase';
import { PlaceService } from '@/domain/place/service';

@Module({
  controllers: [PlaceController],
  providers: [{ provide: PlaceUsecaseToken, useClass: PlaceService }],
})
export class PlaceModule {}
