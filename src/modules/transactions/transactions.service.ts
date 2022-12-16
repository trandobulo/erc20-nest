import { Injectable, Inject } from '@nestjs/common';
import { TransactionModel } from './transactions.model';
import { ethers, Contract } from 'ethers';
import { TransactionEvent } from 'src/modules/transactions/types';
import { TokensRepository } from './tokens.repository';
import { ITokensRepository } from './types';

@Injectable()
export class TransactionsService {
  tokensRepository: ITokensRepository;
  constructor(
    @Inject('TRANSACTIONS')
    private repository: typeof TransactionModel,
  ) {
    this.tokensRepository = new TokensRepository();
  }

  async addTransaction(
    from: string,
    to: string,
    eventHash: string,
    eventObj: TransactionEvent,
  ) {
    const row = await this.repository.create({
      from_address: from,
      to_address: to,
      transaction_hash: eventHash,
      event_obj: JSON.stringify(eventObj),
    });

    console.log(`Transaction with ${row.transaction_hash} hash was created`);
  }

  async getAllTransactions(): Promise<TransactionModel[]> {
    return await this.repository.findAll();
  }

  async getUserTransaction(
    userAddress: string,
  ): Promise<TransactionModel[] | void> {
    if (!userAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
      throw Error('Incorrect user address');
    }

    return await this.repository.findAll({
      where: { from_address: userAddress },
    });
  }

  trackTransfers(): void {
    const tokenInfo = this.tokensRepository.getToken('tatoken');

    try {
      const provider = new ethers.providers.WebSocketProvider(
        tokenInfo.webSocketApi,
      );

      const contract = new Contract(tokenInfo.address, tokenInfo.abi, provider);

      contract.on(
        'Transfer',
        (from: string, to: string, amount: string, event: TransactionEvent) => {
          this.addTransaction(from, to, event.transactionHash, event);
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
    } catch (err) {
      console.log('Something wrong with a network');
    }
  }
}
