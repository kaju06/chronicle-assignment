import express, { Application } from 'express';
import { Server } from 'http';
import appRouter from './routes/document.route';
import { Database } from './database';

/**
 * @description meta app main class
 * @export
 * @class App
 */
export default class App {
  private server!: Server;
  /**
   * Creates an instance of App.
   * @param {string} [port=3000] server port for webserver
   * @param {Application} application Express application instance
   * @memberof App
   */
  constructor(private port: string, private application: Application) {
    this.bootstrap();
  }

  /**
   * @description Starts server on specified port
   * @memberof App
   */
  start() {
    this.server = this.application.listen(this.port, () => {
      console.info(`Service started listening on port:: ${this.port}`);
    });
  }

  /**
   * @description Bootstraps all the components
   * @memberof App
   */
  async bootstrap() {
    await this.connectToDatabase();
    this.initRoutes();
    this.start();
  }

  /**
   * @description Initialized Routes
   * @memberof App
   */
  initRoutes() {
    console.info('Configuring routes');
    this.application.use(express.json());
    this.application.use(appRouter);
  }

  /**
   * @description Connects to database & register models
   * @memberof App
   */
  async connectToDatabase() {
    console.info('Connecting to database');
    await Database.connect();
  }

  /**
   * @description Graceful shutdown
   * @memberof App
   */
  public async gracefulShutdown() {
    try {
      await this.server.close();
      await Database.gracefulShutdown();
      process.exit(0);
    } catch (e: any) {
      process.exit(1);
    }
  }

  /**
   * @description
   * @memberof App
   */
  shutdown(): void {
    this.server.close();
  }
}
