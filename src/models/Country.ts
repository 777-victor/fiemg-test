/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  AutoIncrement,
  PrimaryKey,
  HasMany,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import University from './University';

@Table({
  tableName: 'countries',
})
class Country extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

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

  @Column
  name: string;

  @Column({ field: 'alpha_two_code' })
  alphaTwoCode: string;

  @HasMany(() => University)
  universities: University[];
}

export default Country;
