"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
class Configs {
}
exports.default = Configs;
Configs.DATABASE = {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    dialect: 'postgres',
    logging: false,
    timezone: 'utc',
    models: [(0, path_1.join)(__dirname, '..', 'database/models')],
};
Configs.PORT = process.env.PORT;
