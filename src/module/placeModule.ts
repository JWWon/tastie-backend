import { Module } from '@nestjs/common';
import { PlaceController } from '../web/api/place/controller';

@Module({
  controllers: [PlaceController],
})
export class PlaceModule {}
