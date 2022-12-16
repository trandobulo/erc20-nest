import TATokenAbi from '../../contracts/TATokenAbi';
import { Contracts, ContractInfo } from './types';

export class TokensRepository {
  contracts: Contracts;
  contractName: string;

  constructor() {
    this.contracts = {
      tatoken: {
        webSocketApi:
          'wss://eth-goerli.g.alchemy.com/v2/8weDGpKHnBC5Eg2pDtcOcdxs_fA6-kFm',
        address: '0xade4228f9DE91099928647397bA5114Ea85D7F81',
        abi: TATokenAbi,
      },
    };
  }

  addToken(contractName: string, contractInfo: ContractInfo) {
    {
      this.contracts[contractName] = contractInfo;
    }
  }

  getToken(contractName: string) {
    const tokenInfo = this.contracts[contractName];
    if (tokenInfo) {
      return tokenInfo;
    } else {
      throw Error(`App doesn't support contract ${contractName}`);
    }
  }
}
