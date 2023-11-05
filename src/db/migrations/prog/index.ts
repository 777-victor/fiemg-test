import { exec } from 'child_process';

export const migrate = () =>
  new Promise<void>((resolve, reject) => {
    const migrate = exec(
      `npx sequelize-cli db:migrate  --env 'test'`,
      { env: process.env },
      (err) => (err ? reject(err) : resolve()),
    );

    // Forward stdout+stderr to this process
    if (migrate) {
      migrate.stdout?.pipe(process.stdout);
      migrate.stderr?.pipe(process.stderr);
    }
  });
