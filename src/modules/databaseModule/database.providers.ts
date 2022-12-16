import { Sequelize } from 'sequelize-typescript';
import { TransactionModel } from '../transactions/transactions.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'transactions',
      });
      sequelize.addModels([TransactionModel]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
