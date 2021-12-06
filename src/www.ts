#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from './app';
import dotenv from 'dotenv';
import { connect } from './db/db';

dotenv.config()

const port = normalizePort(process.env.PORT || '3000');

async function start() {
  app.set('port', port);

  await connect()

  app.listen(port, () => {
    console.log("Server started successfully");
  })
}


function normalizePort(val: string) {
  const port = parseInt(val);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ?
    'Pipe ' + port :
    'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

start()