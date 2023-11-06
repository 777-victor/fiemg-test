// eslint-disable-next-line
// const dbConfig = require('../configs/database');
require('dotenv').config();

let dbConfig = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
};

dbConfig.database = process.env.DB_NAME_TEST;

// eslint-disable-next-line
const mysql = require('mysql2/promise');

export async function createDatabase() {
  const connection = await mysql.createConnection({
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.username,
    password: dbConfig.password,
  });
  if (process.env.NODE_ENV == 'test')
    await connection.query(`DROP DATABASE IF EXISTS \`${dbConfig.database}\``);
  await connection.query(
    `CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;`,
  );
  await connection.end();
}
export async function dropDataBase() {
  const connection = await mysql.createConnection({
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.username,
    password: dbConfig.password,
  });
  if (process.env.NODE_ENV === 'test')
    await connection.query(`DROP DATABASE IF EXISTS \`${dbConfig.database}\``);
  await connection.end();
}
