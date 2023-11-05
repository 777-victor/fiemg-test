import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { logger } from '@helpers/logger';
import AuthService from '@services/implementations/AuthService';

export default class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
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

  // logout = async (req: Request, res: Response) => {
  //   await this.authService.logout(req, res);
  //   res.status(httpStatus.NO_CONTENT).send();
  // };
}
