import httpStatus from 'http-status';
import * as bcrypt from 'bcrypt';
import { logger } from '@helpers/logger.js';
import UserDao from '@dao/implementations/UserDao.js';
import responseHandler from '@helpers/responseHandler.js';
import IAuthService from '@services/contracts/IAuthService.js';
import TokenService from './TokenService';

export default class AuthService implements IAuthService {
  private userDao: UserDao;
  private tokenService: TokenService;

  constructor() {
    this.userDao = new UserDao();
    this.tokenService = new TokenService();
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

      let token = {};
      if (user != null) {
        token = { token: this.tokenService.generateToken(user.id.toString()) };
      }

      if (!isPasswordValid) {
        statusCode = httpStatus.BAD_REQUEST;
        message = 'Wrong Password!';
        return responseHandler.returnError(statusCode, message);
      }

      return responseHandler.returnSuccess(statusCode, message, token);
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
