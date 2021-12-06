import app from './app';
import { connect } from './db/db';

import config from './config';

async function start() {
  app.set('port', config.app.port);

  await connect()

  app.listen(config.app.port, () => {
    console.log("Server started successfully");
  })
}

start()