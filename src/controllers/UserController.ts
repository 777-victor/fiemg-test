import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { ApiServiceResponse } from 'apiServiceResponse';
// import { logger } from '@configs/logger.js';
// import { tokenTypes } from '@configs/tokens.js';
// import { IUser } from '@models/interfaces/IUser.js';
import UserService from '@services/implementations/UserService';
import { logger } from '../helpers/logger';
import User from '../models/User';

export default class AuthController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  create = async (req: Request, res: Response) => {
    try {
      logger.info('bateu aqui2');

      const createUserReponse: ApiServiceResponse =
        await this.userService.createUser(req.body);

      res.status(createUserReponse.code).send(createUserReponse);
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const updateUserReponse: ApiServiceResponse =
        await this.userService.updateUser(req.body);

      res.status(updateUserReponse.code).send(updateUserReponse);
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;

      const deleteUserReponse: ApiServiceResponse =
        await this.userService.delete(userId);

      res.status(deleteUserReponse.code).send(deleteUserReponse);
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  getUser = async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;

      const getUserReponse: User | null =
        await this.userService.getUserById(userId);

      res
        .status(getUserReponse ? httpStatus.OK : httpStatus.NOT_FOUND)
        .send(getUserReponse);
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };
}
