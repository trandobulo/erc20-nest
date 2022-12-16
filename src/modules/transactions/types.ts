export interface Contracts {
  tatoken: ContractInfo;
}

export interface ContractInfo {
  webSocketApi: string;
  address: string;
  abi: any;
}

export interface TransactionEvent {
  blockNumber: number;
  blockHash: string;
  transactionIndex: number;
  removed: boolean;
  address: string;
  data: string;
  topics: string[];
  transactionHash: string;
  logIndex: number;
  event: string;
  eventSignature: string;
  args: [string, string, { _hex: string; _isBigNumber: boolean }];
}

export interface ITokensRepository {
  contracts: { tatoken: ContractInfo };
  addToken(contractName: string, contractInfo: ContractInfo): void;
  getToken(contractName: string): ContractInfo;
}
