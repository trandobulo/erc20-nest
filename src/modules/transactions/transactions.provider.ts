import { TransactionModel } from './transactions.model';

export const transactionProviders = [
  {
    provide: 'TRANSACTIONS',
    useValue: TransactionModel,
  },
];
