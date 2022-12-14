import { Injectable } from '@nestjs/common';
import TATokenAbi from '../contracts/TATokenAbi';
import { Contracts, ContractInfo, TransactionEvent } from './types';

@Injectable()
export class AppRepository {
  contracts: Contracts;
  contractName: string;
  currentContract: ContractInfo;
  constructor(name: string) {
    this.contracts = {
      tatoken: {
        webSocketApi:
          'wss://eth-goerli.g.alchemy.com/v2/8weDGpKHnBC5Eg2pDtcOcdxs_fA6-kFm',
        address: '0xade4228f9DE91099928647397bA5114Ea85D7F81',
        abi: TATokenAbi,
        events: [],
      },
    };
    this.contractName = name;

    this.currentContract = this.contracts[name];
  }

  getContractInfo(): ContractInfo {
    try {
      if (this.currentContract) {
        return this.currentContract;
      }
      throw Error(`App isn't support contract ${this.contractName}`);
    } catch (err) {
      return err;
    }
  }

  getContractEvents(): TransactionEvent[] {
    try {
      return this.getContractInfo().events;
    } catch (err) {
      return err;
    }
  }

  addEventToContractInfo(event: TransactionEvent) {
    this.currentContract.events.unshift(event);
  }
}
