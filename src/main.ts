import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from '@/app.module';

function registerSwaggerDoc(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Pickat Bakend')
    .setDescription('The pickat API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
}

const enabledSwaggerDocs = (app: INestApplication): boolean => app.get<ConfigService>('ConfigService').get('swagger.enable')
const getAppPort = (app: INestApplication): number => app.get<ConfigService>('ConfigService').get('listenPort');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  if (enabledSwaggerDocs(app)) {
    registerSwaggerDoc(app);
  }

  await app.listen(getAppPort(app));
}

bootstrap();
