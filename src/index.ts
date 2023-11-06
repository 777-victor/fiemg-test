import app from './server';
import cron from './cron';
import database from './db';

if (app) {
  try {
    database.authenticate().then(() => {
      cron.startCronJobs();
    });
  } catch (err) {
    console.log(err);
  }

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}
