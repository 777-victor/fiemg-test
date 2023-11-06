import User from '@/src/models/User';
import ISuperDao from './ISuperDao';

export default interface IUserDao extends ISuperDao {
  findByEmail: (email: string) => Promise<User | null>;
  isEmailExists: (email: string) => Promise<boolean>;
}
