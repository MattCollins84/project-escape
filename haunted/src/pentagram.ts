import { Switch } from './lib/Switch';
import * as SocketIO from 'socket.io';
import { argv } from 'optimist'
import * as express from 'express'
import { Server } from 'http'
import * as path from 'path'

const port = argv.port ? argv.port : 5000

const app = express();
const server = new Server(app);
const io = SocketIO(server, { origins: '*:*'})

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

server.listen(port)

app.get('/', function (req, res) {
  const file = path.resolve(__dirname + '/../public/index.html');
  console.log(file);
  return res.sendFile(file);
});

/**
 * PI Stuff
 */
const debounce = 200;
const magnets = new Switch(17, 'in', 'both', { debounceTimeout: debounce });
const reset = new Switch(27, 'in', 'both', { debounceTimeout: debounce });

const config = {
  activated: false
}

io.on('connect', socket => {
  console.log('client connected', socket.id)
})

magnets.on('value', () => {
  console.log(magnets.value)

  if (magnets.value && config.activated === false) {
    io.emit('play-video');
    config.activated = true;
    console.log('Triggering video')
  }
})

reset.on('value', () => {
  if (reset.value === true && config.activated === true) {
    io.emit('reset');
    config.activated = false;
    console.log('resetting')
  }
})