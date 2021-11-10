import { createApplication } from './app.js';
import { loadConfig } from './config.js';
import { startServer } from './server.js';

export default async function start() {
  const config = await loadConfig();
  const app = createApplication(config);
  await startServer(app);
}
