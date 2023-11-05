import { exec } from 'child_process';

export const seeder = () =>
  new Promise<void>((resolve, reject) => {
    const seeder = exec(
      `npx sequelize-cli db:seed:all  --env 'test'`,
      { env: process.env },
      (err) => (err ? reject(err) : resolve()),
    );

    // Forward stdout+stderr to this process
    if (seeder) {
      seeder.stdout?.pipe(process.stdout);
      seeder.stderr?.pipe(process.stderr);
    }
  });
