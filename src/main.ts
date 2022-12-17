import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/transactions/transactions.module';
import { TransactionsService } from './modules/transactions/transactions.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  app.get(TransactionsService).trackTransfers('tatoken');
}

bootstrap();
