/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  AutoIncrement,
  PrimaryKey,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import Country from './Country';

@Table({
  tableName: 'universities',
})
class University extends Model {
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

  @Column({
    allowNull: true,
    field: 'web_page',
  })
  webPage?: string;

  @Column({
    allowNull: true,
  })
  domain?: string;

  @Column({
    allowNull: true,
    field: 'state_province',
  })
  stateProvince?: string;

  @ForeignKey(() => Country)
  @Column({ field: 'country_id' })
  countryId: number;

  @BelongsTo(() => Country)
  country: Country;
}

export default University;
