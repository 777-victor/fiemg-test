import { Sequelize } from 'sequelize-typescript';
import User from '../models/User';
// import * as QueueJobs from '../libs/Queue';
import { logger } from '../helpers/logger';
import Country from '../models/Country';
import University from '../models/University';

interface CustomSequelize extends Sequelize {
  afterConnect?: any;
  afterDisconnect?: any;
  openConnecton?: any;
  closeConnection?: any;
}

// eslint-disable-next-line
const dbConfig = require('../configs/database');
const sequelize: CustomSequelize = new Sequelize(dbConfig);

try {
  const models = [User, Country, University];

  sequelize.addModels(models);
} catch (e) {
  logger.error(e);
}

export default sequelize;
