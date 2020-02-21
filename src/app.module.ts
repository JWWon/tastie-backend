import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { RestaurantModule } from '@/module/restaurantModule';
import { PlaceModule } from '@/module/placeModule';
import config from '@/config/configuration';
import { CaseModule } from './module/caseModule';

@Module({
  imports: [
    RestaurantModule,
    PlaceModule,
    CaseModule,
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
