import httpStatus from 'http-status';
import * as bcrypt from 'bcrypt';
import { logger } from '@helpers/logger';
import UserDao from '@dao/implementations/UserDao';
import responseHandler from '@helpers/responseHandler';
import IAuthService from '@services/contracts/IAuthService';
import { generateToken } from '@helpers/jwtHelper';

export default class AuthService implements IAuthService {
  private userDao: UserDao;

  constructor() {
    this.userDao = new UserDao();
  }

  loginWithEmailPassword = async (email: string, password: string) => {
    try {
      let statusCode = httpStatus.BAD_REQUEST;
      let message = 'Invalid credentials!';
      let user = await this.userDao.findByEmail(email);
      if (!user) {
        return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);

      let data = {};
      if (user != null) {
        data = generateToken(user.id.toString());
      }

      if (!isPasswordValid) {
        return responseHandler.returnError(statusCode, message);
      }
      message = 'Login Successful';

      return responseHandler.returnSuccess(httpStatus.OK, message, data);
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(
        httpStatus.BAD_GATEWAY,
        'Something Went Wrong!!',
      );
    }
  };

  // logout = async (req: Request, res: Response) => {
  //   // const refreshTokenDoc = await this.tokenDao.findOne({

  // };
}
