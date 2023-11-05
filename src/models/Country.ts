/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  AutoIncrement,
  PrimaryKey,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
  tableName: 'countries',
})
class Country extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;

  @Column({ field: 'alpha_two_code' })
  alphaTwoCode: string;

  @CreatedAt
  @Column({
    type: DataTypes.DATE,
    field: 'created_at',
  })
  createdAt: Date;

  @UpdatedAt
  @Column({
    type: DataTypes.DATE,
    field: 'updated_at',
  })
  updatedAt: Date;
}

export default Country;
