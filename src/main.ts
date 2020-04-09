require('dotenv').config();
import { AddressInfo } from 'net';
import { App } from './app/app';
import { DB } from './app/database';

async function bootstrap(): Promise<void> {
  // Create database connections
  await DB.getInstance().connect();

  // Create servers
  const app = new App();
  const httpServer = await app.start();
  const { address: httpAddress, port: httpPort } = httpServer.address() as AddressInfo;

  console.log(`HTTP server started on http://${httpAddress}:${httpPort}`);

  // Hot Module Replacement API
  if (module.hot) {
    let currentApp = app.app;

    module.hot.accept('./app/app', () => {
      httpServer.removeListener('request', currentApp);

      import('./app/app')
        .then(({ App }) => {
          const nextApp = new App();
          nextApp.config();
          currentApp = nextApp.app;
          httpServer.on('request', currentApp);

          console.log('Servers are reloaded!');
        })
        .catch(err => console.error(err));
    });

    // For reload main module (self). It will be restart http-server.
    module.hot.accept();
    module.hot.dispose(async () => {
      console.log('Disconnect fom databases and restart servers');
      app.close();
      await DB.getInstance().destroyConnection();
    });
  }
}

(async (): Promise<void> => await bootstrap())();
