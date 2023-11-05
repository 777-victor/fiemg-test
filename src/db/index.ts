import { Sequelize } from 'sequelize-typescript';
import User from '../models/User';
// import * as QueueJobs from '../libs/Queue';
import { logger } from '../helpers/logger';
import Country from '../models/Country';
import University from '../models/University';

interface CustomSequelize extends Sequelize {
  afterConnect?: any;
  afterDisconnect?: any;
}

// eslint-disable-next-line
const dbConfig = require('../configs/database');
const sequelize: CustomSequelize = new Sequelize(dbConfig);

try {
  const models = [User, Country, University];

  sequelize.addModels(models);

  // const startLoopDb = () => {
  //   // eslint-disable-next-line no-underscore-dangle
  //   global._loopDb = setInterval(() => {
  //     FindUpdateTicketsInactiveChatBot();
  //     console.log("DATABASE CONNECT");
  //   }, 60000);
  // };

  sequelize.afterConnect(() => {
    logger.info('DATABASE CONNECT');
    // QueueJobs.default.add('VerifyTicketsChatBotInactives', {});
    // QueueJobs.default.add('SendMessageSchenduled', {});
  });

  sequelize.afterDisconnect(() => {
    logger.info('DATABASE DISCONNECT');

    // eslint-disable-next-line no-underscore-dangle
    // clearInterval(global._loopDb);
  });
} catch (e) {
  logger.error(e);
}
export default sequelize;
