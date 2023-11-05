import User from '@/src/models/User';

export default interface IUserDao {
  findByEmail: (email: string) => Promise<User | null>;
  isEmailExists: (email: string) => Promise<boolean>;
}
