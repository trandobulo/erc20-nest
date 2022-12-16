import { Table, Column, Model } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table
export class TransactionModel extends Model {
  @Column
  from_address: string;

  @Column
  to_address: string;

  @Column
  transaction_hash: string;

  @Column(DataTypes.JSON)
  event_obj: JSON;
}
