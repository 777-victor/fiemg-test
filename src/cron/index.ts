import * as cron from 'node-cron';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { EVERY_DAY_03AM, EVERY_MINUTE } from '@configs/scheduleConstants';
import { fetchUniversities } from './fetchUniversities';
import { logger } from '../helpers/logger';

const generateTransactions = cron.schedule(EVERY_DAY_03AM, async () => {
  console.log('cronjob running');
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
    generateTransactions.start();
    console.log('Cronjobs configured');
  },
};
