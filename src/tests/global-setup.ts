console.log('init test global-setup');
import { createDatabase } from '../db/createDatabase';
import { migrate } from '../db/migrations/prog';
import { seeder } from '../db/seeders/prog';

// Seed the database with schema and data
async function seedTestDatabase() {
  // await connect()
  try {
    await migrate();
    await seeder();
  } catch (error: any) {
    throw new Error(error);
  } finally {
    //await close()
  }
}

export default async () => {
  try {
    await createDatabase();
    await seedTestDatabase();
    console.log('Test database created successfully');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
