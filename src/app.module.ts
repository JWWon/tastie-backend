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
  /**
   *  TODO: 몽고디비 의존성을 제거하기 위해 몽고디비를 사용하는 레스토랑 모듈을 비활성화합니다.
   *  이후에 몽고디비 대신 RDS를 사용하도록 변경해야 합니다.
   *  */
  // RestaurantModule,
} from './module';
// import { Restaurant } from './infrastructure/typeorm/document/restaurant';

@Module({
  imports: [
    DiscoveryModule,
    CoordinateModule,
    CaseModule,
    AuthModule,
    UserModule,
    // RestaurantModule,
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('db.host'),
        port: configService.get('db.port'),
        username: configService.get('db.username'),
        password: configService.get('db.password'),
        database: configService.get('db.database'),
        entities: [`${__dirname}/infrastructure/typeorm/model/*{.ts,.js}`],
        synchronize: configService.get('db.synchronize'),
      }),
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   name: 'restaurantConnection',
    //   useFactory: async (configService: ConfigService) => ({
    //     type: 'mongodb' as 'mongodb',
    //     url: configService.get('mongo.url'),
    //     entities: [Restaurant],
    //     ssl: true,
    //   }),
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
