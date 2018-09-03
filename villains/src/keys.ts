import { Switch } from './lib/Switch';
import { argv } from 'optimist'
import * as io from 'socket.io-client';

const gameHost = argv.host ? argv.host : 'http://localhost'
const gamePort = argv.port ? argv.port : 5000

const socket = io(`${gameHost}:${gamePort}`)
// const redSwitch = new Switch(4, 'in', 'both', { debounceTimeout: 10 })
const blueSwitch = new Switch(17, 'in', 'both', { debounceTimeout: 100 })

const compareValues = () => {

  // if (!redSwitch.value) return false;
  // if (!blueSwitch.value) return false;

  if (blueSwitch.value) {
    socket.emit('pauseTimer', { name: 'villains' })
    socket.emit('doSuccess', { name: 'villains' })
  }

  else {
    socket.emit('customEvent', { name: 'villains', event: 'denied' })
  }

}

// redSwitch.on('value', compareValues)
// blueSwitch.on('value', compareValues)

console.log('hi')