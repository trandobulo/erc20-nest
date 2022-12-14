import { Controller, Get, Param, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from '../services/app.service';
import { transactionEvents } from '../ethers/ethers';
import { TransactionEvent } from 'src/ethers/types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('transactions')
  getTransactions(@Res() response: Response): string {
    try {
      return JSON.stringify(transactionEvents);
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
  ): string {
    try {
      if (!userAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
        throw Error('incorrect user address');
      }

      const userTransactionEvents: TransactionEvent[] =
        transactionEvents.filter((item) => item.args[0] === userAddress);

      if (transactionEvents.length > 0) {
        return JSON.stringify(userTransactionEvents);
      }
      return `No events from ${userAddress} was fined`;
    } catch (err) {
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: err.message });
    }
  }
}
