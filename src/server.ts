/* eslint-disable no-console */
import { Server } from 'http';
import mongoose from 'mongoose';
import seedSuperAdmin from './Db';
import app from './app';
import config from './config/index';
const port = 5000;

process.on('uncaughtException', error => {
  console.error(error);
  process.exit(1);
});

let server: Server;

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('Database is connected successfully');
    seedSuperAdmin();
    server = app.listen(port, () => {
      console.log(`Application listening on port ${port}`);
    });
  } catch (err) {
    console.log('Failed to connect database', err);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        console.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

bootstrap();

process.on('SIGTERM', () => {
  console.warn('SIGTERM is received');
  if (server) {
    server.close();
  }
});
