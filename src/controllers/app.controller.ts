import { Controller, Get, Param, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from '../services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('transactions')
  getTransactions(@Res() response: Response): void {
    try {
      response.send(this.appService.getTransactionEvents());
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
      const userTransactionEvents =
        this.appService.getUserTransactionEvents(userAddress);
      if (userTransactionEvents.length > 0) {
        response.send(userTransactionEvents);
      }
      response.send(`No events from ${userAddress} was fined`);
    } catch (err) {
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: err.message });
    }
  }
}
