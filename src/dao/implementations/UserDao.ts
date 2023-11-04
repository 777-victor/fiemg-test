import IUserDao from '@dao/contracts/IUserDao';
// import sequelize from '../../db/index';
import User from '@/src/models/User';
import SuperDao from './SuperDao';

// const User = sequelize.user;

export default class UserDao extends SuperDao implements IUserDao {
  constructor() {
    super(User);
  }

  async findByEmail(email: string) {
    return User.findOne({ where: { email } });
  }

  async isEmailExists(email: string) {
    return User.count({ where: { email } }).then((count: number) => {
      if (count != 0) {
        return true;
      }
      return false;
    });
  }

  async createWithTransaction(user: any, transaction: any) {
    return User.create(user, { transaction });
  }
}