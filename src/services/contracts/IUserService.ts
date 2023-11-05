import { ApiServiceResponse } from '../../types/apiServiceResponse';
import { IUser } from '@/src/models/interfaces/IUser';

export default interface IUserService {
  createUser: (userBody: IUser) => Promise<ApiServiceResponse>;
  updateUser: (userBody: IUser) => Promise<ApiServiceResponse>;
  // getUsers: () => Promise<ApiServiceResponse>;
  getUserById(id: number): Promise<IUser | null>;
}
