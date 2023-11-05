import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { ApiServiceResponse, DataTableResponse } from 'apiServiceResponse';
import { logger } from '../helpers/logger';
import UniversityService from '../services/implementations/UniversityService';

export default class UserController {
  private universityService: UniversityService;

  constructor() {
    this.universityService = new UniversityService();
  }

  list = async (req: Request, res: Response) => {
    try {
      logger.info('bateu aqui2');

      const listReponse: DataTableResponse =
        await this.universityService.list();

      res.status(httpStatus.OK).send(listReponse);
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };
}
