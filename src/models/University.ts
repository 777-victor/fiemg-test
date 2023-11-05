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
  tableName: 'universities',
})
class University extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;

  @Column({
    allowNull: true,
    field: 'web_page',
  })
  webPage: string | null;

  @Column({ allowNull: true })
  domain: string | null;

  @Column({
    field: 'state_province',
    allowNull: true,
  })
  stateProvince: string | null;

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

export default University;
