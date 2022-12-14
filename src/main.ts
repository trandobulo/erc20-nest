import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import trackingTransfers from './ethers/ethers';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  trackingTransfers();
}

bootstrap();
