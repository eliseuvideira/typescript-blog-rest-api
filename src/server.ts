import http from 'http';

import app from './app';
import Database from './utils/database';

const port = parseInt(process.env.PORT!, 10) || 3000;
app.set('port', port);

const server = http.createServer(app);

const onError = (err: any) => {
  if (err.syscall !== 'listen') {
    throw err;
  }
  switch (err.code) {
    case 'EACCES':
      // tslint:disable-next-line: no-console
      console.error(`Port ${port} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      // tslint:disable-next-line: no-console
      console.error(`Port ${port} is already in use`);
      process.exit(1);
      break;
    default:
      throw err;
  }
};

const onListening = () => {
  const addr: any = server.address();
  // tslint:disable-next-line: no-console
  console.log(`Listening on port ${addr.port}`);
};

const run = async () => {
  try {
    const uri = process.env.MONGODB_URI!;
    await Database.connect(uri);
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);
  } catch (err) {
    throw err;
  }
};

run().catch((err) => {
  // tslint:disable-next-line: no-console
  console.error(err);
});
