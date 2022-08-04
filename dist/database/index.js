"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const configs_1 = __importDefault(require("../constants/configs"));
const sequelize_typescript_1 = require("sequelize-typescript");
/**
 * @description Manages database connection
 * @export
 * @class Database
 */
class Database {
    /**
     * @description Connects application to Database
     * @static
     * @param {SequelizeOptions} [connectionOptions]
     * @return {*}
     * @memberof Database
     */
    static connect(connectionOptions) {
        if (connectionOptions) {
            this.sequelize = new sequelize_typescript_1.Sequelize(connectionOptions);
        }
        else {
            this.sequelize = new sequelize_typescript_1.Sequelize(configs_1.default.DATABASE);
        }
        return this.sequelize
            .authenticate()
            .then(() => __awaiter(this, void 0, void 0, function* () {
            yield this.sequelize.sync({ force: true });
            console.info(`Successfully connected to database ${configs_1.default.DATABASE.database}`);
            return;
        }))
            .catch((e) => {
            console.error('Failed to connect to database ', e);
        });
    }
    static getDatabaseInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            if (Database.sequelize) {
                return Promise.resolve(Database.sequelize);
            }
            yield Database.connect();
            return Database.sequelize;
        });
    }
    static gracefulShutdown() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.sequelize.close();
        });
    }
}
exports.Database = Database;
