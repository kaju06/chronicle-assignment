import Configs from '../constants/configs';
import { SequelizeOptions, Sequelize } from 'sequelize-typescript';

/**
 * @description Manages database connection
 * @export
 * @class Database
 */
export class Database {
  private static sequelize: Sequelize;

  /**
   * @description Connects application to Database
   * @static
   * @param {SequelizeOptions} [connectionOptions]
   * @return {*}
   * @memberof Database
   */
  public static connect(connectionOptions?: SequelizeOptions) {
    if (connectionOptions) {
      this.sequelize = new Sequelize(connectionOptions);
    } else {
      this.sequelize = new Sequelize(Configs.DATABASE);
    }
    return this.sequelize
      .authenticate()
      .then(async () => {
        const argv = process.argv.slice(2);
        if (argv.length && argv[0] === '--migrate') {
          await this.sequelize.sync({ force: true });
        }
        console.info(
          `Successfully connected to database ${Configs.DATABASE.database}`
        );
        return;
      })
      .catch((e) => {
        console.error('Failed to connect to database ', e);
      });
  }

  public static async getDatabaseInstance(): Promise<Sequelize> {
    if (Database.sequelize) {
      return Promise.resolve(Database.sequelize);
    }
    await Database.connect();

    return Database.sequelize;
  }

  static async gracefulShutdown() {
    return this.sequelize.close();
  }
}
