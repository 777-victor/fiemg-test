import { NextFunction } from 'express';
import {
  ApiServiceResponse,
  DataTableDaoResponse,
  DataTableResponse,
} from '../types/apiServiceResponse';

const logError = (err: Error) => {
  console.error(err);
};

const logErrorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logError(err);
  next(err);
};

const returnError = (statusCode: number, message: string) => {
  const response: ApiServiceResponse = {
    code: statusCode,
    message,
  };
  return response;
};
const returnSuccess = (
  statusCode: number,
  message: string,
  data?: [] | object,
) => {
  const response: ApiServiceResponse = {
    code: statusCode,
    message,
    data,
  };
  return response;
};

const getPaginationData = (
  rows: DataTableDaoResponse,
  page: number,
  limit: number,
): DataTableResponse => {
  const { count: totalItems, rows: data } = rows;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  const response: DataTableResponse = {
    totalItems,
    totalPages,
    currentPage,
    data,
  };
  return response;
};

export default {
  logError,
  logErrorMiddleware,
  returnError,
  returnSuccess,
  getPaginationData,
};
