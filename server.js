const http = require('http');
const app = require('./backend/app');

const onError = (error) => {
  if (error.syscall !== 'listen') {
    console.log(error);
    throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe' + addr : 'port ' + port;
  console.log('Listening on ' + bind);
};

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);
server.on('error', onError);
server.on('listening', onListening);
server.listen(port);
