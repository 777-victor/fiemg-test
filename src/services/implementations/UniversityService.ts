/* eslint-disable @typescript-eslint/no-shadow */
import responseHandler from '@helpers/responseHandler';
import IUniversityService from '../contracts/IUniversityService';
import { Request } from 'express';
import Country from '@/src/models/Country';
import { Op } from 'sequelize';
import IUniversityDao from '@/src/dao/contracts/IUniversityDao';

interface ListUniversityQueryParams {
  country?: string | null;
  alphaTwoCode?: string | null;
  name?: string | null;
  page?: number | null;
  take?: number | null;
}

export default class UniversityService implements IUniversityService {
  private universityDao: IUniversityDao;

  constructor(universityDao: IUniversityDao) {
    this.universityDao = universityDao;
  }

  list = async (req: Request) => {
    const { country, alphaTwoCode, name, page, take } =
      req.query as ListUniversityQueryParams;

    let where = {};

    if (country?.trim()) {
      where = {
        '$country.name$': {
          [Op.like]: `%${country}%`,
        },
      };
    }

    if (alphaTwoCode?.trim()) {
      Object.assign(where, { '$country.alpha_two_code$': alphaTwoCode });
    }

    if (name?.trim()) {
      Object.assign(where, { name: { [Op.like]: `%${name}%` } });
    }

    let limit = take && take < 50 ? take : 50;
    let pg = page ? page : 1;
    let offset = limit * (pg - 1);

    const dataTableData = await this.universityDao.getDataTableData(
      where,
      limit,
      offset,
      [['id', 'DESC']],
      [Country],
    );

    return responseHandler.getPaginationData(dataTableData, pg, limit);
  };
}
