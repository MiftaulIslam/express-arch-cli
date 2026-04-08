import { Server } from './app/Server.js';
import { connectDatabase } from './config/db.js';

const bootstrap = async (): Promise<void> => {
  await connectDatabase();
  new Server().start();
};

bootstrap().catch((error) => {
  console.error('Failed to bootstrap application:', error);
  process.exit(1);
});