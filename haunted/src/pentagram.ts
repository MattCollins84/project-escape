import { Switch } from './lib/Switch';
import * as SocketIO from 'socket.io';
import { argv } from 'optimist'

const port = argv.port ? argv.port : 5000

const io = SocketIO(port)

const debounce = 200;
const magnets = new Switch(17, 'in', 'both', { debounceTimeout: debounce });

const config = {
  activated: false
}

io.on('connect', id => {
  console.log('client connected', id)
})

magnets.on('value', () => {
  console.log(magnets.value)

  if (magnets.value && config.activated === false) {
    io.emit('play-video');
    config.activated = true;
    console.log('Triggering video')
  }
})