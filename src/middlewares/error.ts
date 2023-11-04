import httpStatus from 'http-status';
import { NextFunction, Request, Response } from 'express';
import { config } from '@configs/config';
import { logger } from '@helpers/logger';
import ApiError from '@helpers/ApiError';

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err: any, req: Request, res: Response) => {
  let { statusCode, message } = err;
  console.log('errorHandler', err);

  if (config.nodeEnv === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(config.nodeEnv === 'development' && { stack: err.stack }),
    errors: err.errors,
  };

  if (config.nodeEnv === 'development') {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};

export const errorConverter = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode
      ? httpStatus.BAD_REQUEST
      : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, [], false, err.stack);
  }
  errorHandler(error, req, res);
  next(error);
};
