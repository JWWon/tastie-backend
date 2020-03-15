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

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  registerSwaggerDoc(app);

  const port = app.get<ConfigService>('ConfigService').get('listen_port');

  await app.listen(port);
}

bootstrap();
