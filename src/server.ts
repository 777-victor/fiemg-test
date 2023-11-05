import express, { NextFunction } from 'express';
import cors from 'cors';
import './db';
import apiRoutes from '@routes/index';
import httpStatus from 'http-status';
import ApiError from './helpers/ApiError';
import { errorConverter, errorHandler } from '@middlewares/error';

export const createServer = () => {
  const app = express();
  app
    .disable('x-powered-by')
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(
      cors({
        origin: '*',
      }),
    );

  app.get('/', (req, res) => {
    return res.json({ running: true, environment: process.env.NODE_ENV });
  });

  app.use('/api', apiRoutes);

  // send back a 404 error for any unknown api request
  app.use((req, res, next: NextFunction) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  });

  // convert error to ApiError, if needed
  app.use(errorConverter);
  // handle error
  app.use(errorHandler);

  return app;
};
