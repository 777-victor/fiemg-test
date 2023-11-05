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
      let message = 'Login Successful';
      let statusCode: number = httpStatus.OK;

      let user = await this.userDao.findByEmail(email);
      if (!user) {
        message = 'Invalid Email Address!';
        return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);

      let data = {};
      if (user != null) {
        data = {
          acess_token: generateToken(user.id.toString()),
          type: 'Bearer',
        };
      }

      if (!isPasswordValid) {
        statusCode = httpStatus.BAD_REQUEST;
        message = 'Wrong Password!';
        return responseHandler.returnError(statusCode, message);
      }

      return responseHandler.returnSuccess(statusCode, message, data);
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
