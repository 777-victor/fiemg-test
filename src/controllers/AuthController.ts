import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { logger } from '@helpers/logger';
import AuthService from '@services/implementations/AuthService';
import UserService from '../services/implementations/UserService';
import ApiError from '../helpers/ApiError';
import { IUser } from '../models/interfaces/IUser';

export default class AuthController {
  private authService: AuthService;
  private userService: UserService;

  constructor() {
    this.authService = new AuthService();
    this.userService = new UserService();
  }

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const authResponse = await this.authService.loginWithEmailPassword(
        email.toLowerCase(),
        password,
      );

      const { code, message, data } = authResponse;

      res.status(code).send({ code, message, data });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  me = async (req: Request, res: Response) => {
    try {
      if (!req.userInfo || !req.userInfo.id) {
        throw new ApiError(httpStatus.FORBIDDEN, 'User not logged');
      }
      const userId = req.userInfo.id;
      logger.info(userId);

      const getUserReponse: IUser | null =
        await this.userService.getUserById(userId);

      logger.info(getUserReponse);

      res.status(httpStatus.OK).send(getUserReponse);
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };
}
