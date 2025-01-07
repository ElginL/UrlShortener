const { DataSource } = require("typeorm");
const { join } = require("path");
require('dotenv').config();

const currentDir = join(__dirname, ".");

const source = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'typescript-koa',
    entities: [
      `${currentDir}/**/*.entity.ts`,
    ],
    synchronize: true,
});

module.exports = source;