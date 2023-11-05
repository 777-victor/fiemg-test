/* eslint-disable @typescript-eslint/no-shadow */
import httpStatus from 'http-status';
import responseHandler from '@helpers/responseHandler';
import { logger } from '@/src/helpers/logger';
import UniversityDao from '@/src/dao/implementations/UniversityDao';
import IUniversityService from '../contracts/IUniversityService';

export default class UniversityService implements IUniversityService {
  private universityDao: UniversityDao;

  constructor() {
    this.universityDao = new UniversityDao();
  }
  list = async () => {
    const dataTableData = await this.universityDao.getDataTableData(
      null,
      10,
      0,
    );
    logger.info('OI');
    logger.info(dataTableData);

    return responseHandler.getPaginationData(dataTableData, 1, 10);
  };
}
