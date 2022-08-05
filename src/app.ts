import express, { Application } from 'express';
import { Server } from 'http';
import appRouter from './routes/document.route';
import { Database } from './database';

export default class App {
  private server!: Server;
  constructor(private port: string, private application: Application) {
    this.bootstrap();
  }

  start() {
    this.server = this.application.listen(this.port, () => {
      console.info(`Service started listening on port:: ${this.port}`);
    });
  }

  async bootstrap() {
    await this.connectToDatabase();
    this.initRoutes();
    this.start();
  }

  initRoutes() {
    console.info('Configuring routes');
    this.application.use(express.json());
    this.application.use(appRouter);
  }

  async connectToDatabase() {
    console.info('Connecting to database');
    await Database.connect();
  }

  public async gracefulShutdown() {
    try {
      await this.server.close();
      await Database.gracefulShutdown();
      process.exit(0);
    } catch (e: any) {
      process.exit(1);
    }
  }

  shutdown(): void {
    this.server.close();
  }
}
