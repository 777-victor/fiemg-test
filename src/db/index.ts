import { Sequelize } from 'sequelize-typescript';
import User from '../models/User';
// import * as QueueJobs from '../libs/Queue';
import { logger } from '../helpers/logger';

interface CustomSequelize extends Sequelize {
  afterConnect?: any;
  afterDisconnect?: any;
}

// eslint-disable-next-line
const dbConfig = require('../configs/database');

const sequelize: CustomSequelize = new Sequelize(dbConfig);

const models = [User];

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

export default sequelize;
