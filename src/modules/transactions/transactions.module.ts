import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { DatabaseModule } from 'src/modules/databaseModule/database.module';
import { TransactionsService } from 'src/modules/transactions/transactions.service';
import { transactionProviders } from 'src/modules/transactions/transactions.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [TransactionsController],
  providers: [TransactionsService, ...transactionProviders],
})
export class AppModule {}
