import { dropDataBase } from '../db/createDatabase';

export default async () => {
  try {
    dropDataBase();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
