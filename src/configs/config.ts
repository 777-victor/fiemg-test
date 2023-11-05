import 'dotenv/config';

const envVar = process.env;

export const config = {
  nodeEnv: envVar.NODE_ENV,
  port: envVar.PORT,
  dbHost: envVar.DB_HOST,
  dbUser: envVar.DB_USER,
  dbPass: envVar.DB_PASSWORD,
  dbName: envVar.DB_NAME,
  jwt: {
    secret: envVar.JWT_SECRET,
    accessExpirationMinutes: envVar.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVar.JWT_REFRESH_EXPIRATION_DAYS,
  },
};
