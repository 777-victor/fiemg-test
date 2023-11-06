import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { DataTableResponse } from 'apiServiceResponse';
import { logger } from '../helpers/logger';
import UniversityService from '../services/implementations/UniversityService';
import UniversityDao from '../dao/implementations/UniversityDao';

export default class UserController {
  private universityService: UniversityService;

  constructor() {
    this.universityService = new UniversityService(new UniversityDao());
  }

  list = async (req: Request, res: Response) => {
    try {
      const listReponse: DataTableResponse =
        await this.universityService.list(req);

      res.status(httpStatus.OK).send(listReponse);
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };
}
