import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  process.env.TZ = '-03:00'// timezone de brasilia 
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(4000);
}
bootstrap();

//TODO - Fazer a relação entre o produto e a categoria  n:1  e 1:n
