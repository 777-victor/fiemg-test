import { createServer } from './server';
import cron from './cron';
import database from './db';

const server = createServer();

try {
  database.afterConnect(() => {
    // Start cron jobs
    cron.startCronJobs();
  });
} catch (err) {
  console.log(err);
}

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
