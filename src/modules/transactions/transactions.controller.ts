import { Controller, Get, Param, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { TransactionsService } from 'src/modules/transactions/transactions.service';

@Controller()
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Get('transactions')
  getAllTransactions(@Res() response: Response): void {
    try {
      this.transactionsService.getAllTransactions().then((res) => {
        if (res && res.length > 0) {
          response.send(res);
        } else {
          response.send(`No events were fined`);
        }
      });
    } catch (err) {
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: err.message });
    }
  }

  @Get('user/:userAddress')
  getUserTransactionEvents(
    @Param('userAddress') userAddress: string,
    @Res() response: Response,
  ): void {
    try {
      this.transactionsService.getUserTransaction(userAddress).then((res) => {
        if (res && res.length > 0) {
          response.send(res);
        } else {
          response.send(`No events from ${userAddress} were fined`);
        }
      });
    } catch (err) {
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: err.message });
    }
  }
}
