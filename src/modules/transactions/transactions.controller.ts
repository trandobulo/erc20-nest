import { Controller, Get, Param, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { TransactionsService } from 'src/modules/transactions/transactions.service';

@Controller()
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Get('transactions')
  async getAllTransactions(@Res() response: Response) {
    try {
      const transactions = await this.transactionsService.getAllTransactions();

      if (transactions && transactions.length > 0) {
        response.send(transactions);
      } else {
        response.send(`No events were fined`);
      }
    } catch (err) {
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: err.message });
    }
  }

  @Get('transactions/:userAddress')
  async getUserTransactionEvents(
    @Param('userAddress') userAddress: string,
    @Res() response: Response,
  ) {
    try {
      const transactions = await this.transactionsService.getUserTransaction(
        userAddress,
      );
      if (transactions && transactions.length > 0) {
        response.send(transactions);
      } else {
        response.send(`No events from ${userAddress} were fined`);
      }
    } catch (err) {
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: err.message });
    }
  }
}
