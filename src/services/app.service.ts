import { Injectable } from '@nestjs/common';
import { AppRepository } from 'src/repositories/app.repository';
import { TransactionEvent } from '../repositories/types';
import { ethers, Contract } from 'ethers';

@Injectable()
export class AppService {
  repository: AppRepository;
  constructor() {
    this.repository = new AppRepository('tatoken');
  }

  getTransactionEvents(): TransactionEvent[] {
    return this.repository.getContractEvents();
  }

  getUserTransactionEvents(userAddress: string): TransactionEvent[] | string {
    if (!userAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
      throw Error('Incorrect user address');
    }

    const transactions = this.getTransactionEvents();

    return transactions.filter((item) => item.args[0] === userAddress);
  }

  trackTransfers(): void {
    const tokenInfo = this.repository.getContractInfo();
    const provider = new ethers.providers.WebSocketProvider(
      tokenInfo.webSocketApi,
    );

    const contract = new Contract(tokenInfo.address, tokenInfo.abi, provider);

    contract.on(
      'Transfer',
      (from: string, to: string, amount: string, event: TransactionEvent) => {
        console.log(event);
        this.repository.addEventToContractInfo(event);
      },
    );

    provider._websocket.on('error', async () => {
      console.log(`Unable to connect to  retrying in 3s...`);
      setTimeout(this.trackTransfers, 3000);
    });
    provider._websocket.on('close', async (code: number) => {
      console.log(
        `Connection lost with code ${code}! Attempting reconnect in 3s...`,
      );
      provider._websocket.terminate();
      setTimeout(this.trackTransfers, 3000);
    });
  }
}
