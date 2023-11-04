/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Table,
  Column,
  Model,
  CreatedAt,
  DeletedAt,
  UpdatedAt,
  AutoIncrement,
  PrimaryKey,
  BeforeUpdate,
  BeforeCreate,
} from 'sequelize-typescript';
import { hash, compare } from 'bcrypt';
import { DataTypes } from 'sequelize';

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
  email: string;

  @Column
  password: string;

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

  @DeletedAt
  @Column({
    type: DataTypes.DATE,
    field: 'deleted_at',
  })
  deletedAt: Date;

  @BeforeUpdate
  @BeforeCreate
  static hashPassword = async (instance: User): Promise<void> => {
    if (instance.email) {
      instance.email = instance.email.toLowerCase();
    }
  };

  public checkPassword = async (password: string): Promise<boolean> => {
    return compare(password, this.getDataValue('password'));
  };
}

export default User;
