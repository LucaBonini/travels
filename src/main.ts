import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { seedDb } from './app.init';
import { AppModule } from './app.module';
import { RolesRepository } from './modules/auth/repositories/roles.repository';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const rolesRepository = app.get(RolesRepository);
  seedDb(rolesRepository);
  await app.listen(3000);
}
bootstrap();
