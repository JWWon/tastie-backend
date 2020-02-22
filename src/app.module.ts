import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import config from '@/config/configuration';
import {
  RecommendationModule,
  CoordinateModule,
  CaseModule,
  AuthModule,
} from './module';

@Module({
  imports: [
    RecommendationModule,
    CoordinateModule,
    CaseModule,
    AuthModule,
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
