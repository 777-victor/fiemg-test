/* eslint-disable no-unused-vars */
import {
  Table,
  Column,
  Model,
  CreatedAt,
  DeletedAt,
  UpdatedAt,
  AutoIncrement,
  PrimaryKey,
  BeforeCreate,
  BeforeUpdate,
} from 'sequelize-typescript';
import { hash, compare } from 'bcrypt';

@Table({
  tableName: 'users',
})
class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;

  @Column
  password: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;

  @BeforeUpdate
  @BeforeCreate
  static hashPassword = async (instance: User): Promise<void> => {
    if (instance.password) {
      instance.password = await hash(instance.password, 8);
    }
  };

  public checkPassword = async (password: string): Promise<boolean> => {
    return compare(password, this.getDataValue('password'));
  };
}
