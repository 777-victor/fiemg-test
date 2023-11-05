// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IUser } from '../../models/interfaces/IUser';
interface UserInfo {
  id?: number | null;
  iat?: number | null;
  exp?: number | null;
}

declare global {
  // eslint-disable-next-line no-unused-vars
  namespace Express {
    // eslint-disable-next-line no-unused-vars
    interface Request {
      userInfo?: UserInfo;
    }
  }
}
