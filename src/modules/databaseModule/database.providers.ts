import { Sequelize } from 'sequelize-typescript';
import { TransactionModel } from '../transactions/transactions.model';
import * as dotenv from 'dotenv';

dotenv.config();

console.log(process.env);

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.HOSTNAME,
        port: Number(process.env.PORT),
        username: process.env.LOGIN,
        password: process.env.PASS,
        database: process.env.DATABASE,
      });
      sequelize.addModels([TransactionModel]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
