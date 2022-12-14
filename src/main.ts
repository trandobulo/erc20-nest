import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { AppService } from './services/app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appService = app.get(AppService);
  appService.trackTransfers();
  await app.listen(3000);
}

bootstrap();
