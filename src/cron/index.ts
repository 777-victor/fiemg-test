import * as cron from 'node-cron';

import {
  EVERY_DAY_03AM,
  EVERY_30_MINUTES,
  EVERY_HOUR,
  EVERY_SECOND,
} from '@configs/scheduleConstants';
import { fetchUniversities } from './fetchUniversities';
import { logger } from '../helpers/logger';

const generateTransactions = cron.schedule(EVERY_30_MINUTES, async () => {
  console.log('cronjob running ');
  console.time('Script Execution');
  try {
    await fetchUniversities();
  } catch (err) {
    console.error('cronjob error');
    logger.error(err);
  } finally {
    console.info('cronjob stopped');
    console.timeEnd('Script Execution');
  }
});

export default {
  async startCronJobs() {
    console.log('Cronjobs stated');
    generateTransactions.start();
  },
};
