/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTableDaoResponse } from 'apiServiceResponse.js';
import ISuperDao from '@dao/contracts/ISuperDao';
import { logger } from '@/src/helpers/logger';

export default class SuperDao implements ISuperDao {
  private Model: any;

  constructor(model: any) {
    this.Model = model;
  }

  public async findAll(): Promise<any> {
    return this.Model.findAll()
      .then((result: any) => result)
      .catch((e: any) => {
        logger.error(e);
        console.log(e);
      });
  }

  public async findById(id: number): Promise<any> {
    return this.Model.findOne({ where: { id } })
      .then((result: any) => result)
      .catch((e: any) => {
        logger.error(e);
        console.log(e);
      });
  }

  public async findOneByWhere(
    where: object,
    attributes: string[] | null = null,
    order: string[] = ['id', 'desc'],
  ): Promise<any> {
    if (attributes == null) {
      return this.Model.findOne({
        where,
        order: [order],
      })
        .then((result: any) => result)
        .catch((e: any) => {
          logger.error(e);
          console.log(e);
        });
    }
    return this.Model.findOne({
      where,
      attributes,
      order: [order],
    })
      .then((result: any) => result)
      .catch((e: any) => {
        logger.error(e);
        console.log(e);
      });
  }

  public async updateWhere(data: object, where: object): Promise<any> {
    return this.Model.update(data, { where })
      .then((result: any) => result)
      .catch((e: any) => {
        logger.error(e);
        console.log(e);
      });
  }

  public async updateById(data: object, id: number): Promise<any> {
    return this.Model.update(data, { where: { id } })
      .then((result: any) => result)
      .catch((e: any) => {
        logger.error(e);
        console.log(e);
      });
  }

  public async create(data: any): Promise<any> {
    const newData = new this.Model(data);
    return newData
      .save()
      .then((result: any) => result)
      .catch((e: any) => {
        logger.error(e);
        console.log(e);
      });
  }

  public async findByWhere(
    where: object,
    attributes: string[] | undefined | unknown = undefined,
    order: string[] = ['id', 'asc'],
    limit: number | null = null,
    offset: number | null = null,
  ): Promise<any> {
    if (!attributes) {
      return this.Model.findAll({
        where,
        order: [order],
        limit,
        offset,
      })
        .then((result: any) => result)
        .catch((e: any) => {
          logger.error(e);
          console.log(e);
        });
    }

    return this.Model.findAll({
      where,
      attributes,
      order: [order],
      limit,
      offset,
    })
      .then((result: any) => result)
      .catch((e: any) => {
        logger.error(e);
        console.log(e);
      });
  }

  public async deleteByWhere(where: object): Promise<any> {
    return this.Model.destroy({ where })
      .then((result: any) => result)
      .catch((e: any) => {
        console.log(e);
      });
  }

  public async bulkCreate(data: object[]) {
    return this.Model.bulkCreate(data)
      .then((result: any) => result)
      .catch((e: any) => {
        logger.error(e);
        console.log(e);
      });
  }

  public async getCountByWhere(where: object) {
    return this.Model.count({ where })
      .then((result: any) => result)
      .catch((e: any) => {
        logger.error(e);
        console.log(e);
      });
  }

  public async incrementCountInFieldByWhere(
    fieldName: string,
    where: object,
    incrementValue = 1,
  ): Promise<any> {
    const instance = await this.Model.findOne({ where });
    if (!instance) {
      return false;
    }
    return instance
      .increment(fieldName, { by: incrementValue })
      .then((result: any) => result)
      .catch((e: any) => {
        logger.error(e);
        console.log(e);
      });
  }

  public async decrementCountInFieldByWhere(
    fieldName: string,
    where: object,
    decrementValue = 1,
  ) {
    const instance = await this.Model.findOne({ where });
    if (!instance) {
      return false;
    }
    return instance
      .decrement(fieldName, { by: decrementValue })
      .then((result: any) => result)
      .catch((e: any) => {
        logger.error(e);
        console.log(e);
      });
  }

  public async getDataTableData(
    where: object | null,
    limit: number,
    offset: number,
    order: string[][] = [['id', 'DESC']],
    include: object[] = [],
  ): Promise<DataTableDaoResponse> {
    return this.Model.findAndCountAll({
      include: include,
      where: where,
      limit: Number(limit),
      offset: Number(offset),
      order,
    })
      .then((result: any) => result)
      .catch((e: any) => {
        logger.error(e);
        console.log(e);
      });
  }
}
