import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import config from '@/config/configuration';
import {
  DiscoveryModule,
  CoordinateModule,
  CaseModule,
  AuthModule,
  UserModule,
  RestaurantModule,
} from './module';
import { Restaurant } from './infrastructure/typeorm/document/restaurant';

@Module({
  imports: [
    DiscoveryModule,
    CoordinateModule,
    CaseModule,
    AuthModule,
    UserModule,
    RestaurantModule,
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres' as 'postgres',
        host: configService.get('db.host'),
        port: configService.get('db.port'),
        username: configService.get('db.username'),
        password: configService.get('db.password'),
        database: configService.get('db.database'),
        entities: [`${__dirname}/infrastructure/typeorm/model/*{.ts,.js}`],
        synchronize: configService.get('db.synchronize'),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      name: 'restaurantConnection',
      useFactory: async (configService: ConfigService) => ({
        type: 'mongodb' as 'mongodb',
        url: configService.get('mongo.url'),
        entities: [Restaurant],
        ssl: true,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
