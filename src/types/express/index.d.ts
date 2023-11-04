import { IUser } from '../../models/interfaces/IUser';

declare global {
  // eslint-disable-next-line no-unused-vars
  namespace Express {
    // eslint-disable-next-line no-unused-vars
    interface Request {
      userInfo?: IUser;
    }
  }
}
