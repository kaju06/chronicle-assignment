import { join } from 'path';
import { SequelizeOptions } from 'sequelize-typescript';
import { config } from 'dotenv';
config();

export default class Configs {
  static readonly DATABASE: SequelizeOptions = {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    dialect: 'postgres',
    logging: false,
    timezone: 'utc',
    models: [join(__dirname, '..', 'database/models')],
  };

  static readonly PORT = process.env.PORT;
}
