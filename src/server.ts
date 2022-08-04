import App from './app';
import Configs from './constants/configs';
import express from 'express';

const bootServer = (port?: string): any => {
  const SERVER_PORT = port || Configs.PORT as string;
  console.debug('Bootstrapping auth service application');

  const app = new App(SERVER_PORT, express());

  process.once('SIGTERM', async () => {
    console.info('Got SIGTERM signal.');
    console.info('Proceeding with graceful shutdown.');

    const READINESS_PROBE_DELAY = 10000; // 10s

    setTimeout(app.gracefulShutdown.bind(app), READINESS_PROBE_DELAY);
  });

  process.on('uncaughtException', (err) => {
    console.error('UncaughtException: ', err);
  });

  process.on('unhandledRejection', (err: any) => {
    console.error('UnhandledRejection ', err);
  });

  return app;
};

bootServer();

export default bootServer;
