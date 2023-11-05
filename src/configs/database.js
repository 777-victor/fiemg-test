require('dotenv').config();

let logging = false;
// if (process.env.APP_DEBUG) logging = console.log;

let dbConfig = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  underscored: true,
  freezeTableName: true,
  logging: logging,
  dialect: 'mysql',
  charset: 'utf8mb4',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  createdBy: 'created_by',
  updatedBy: 'updated_by',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

if (process.env.NODE_ENV == 'test') {
  dbConfig.database = process.env.DB_NAME_TEST;
}

module.exports = dbConfig;
