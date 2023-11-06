import httpStatus from 'http-status';
import * as bcrypt from 'bcrypt';
import { logger } from '@helpers/logger';
import responseHandler from '@helpers/responseHandler';
import IAuthService from '@services/contracts/IAuthService';
import { generateToken } from '@helpers/jwtHelper';
import IUserDao from '@/src/dao/contracts/IUserDao';

export default class AuthService implements IAuthService {
  private userDao: IUserDao;

  constructor(userDao: IUserDao) {
    this.userDao = userDao;
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
}
