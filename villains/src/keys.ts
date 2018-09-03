import { Switch } from './lib/Switch';
import { argv } from 'optimist'
import * as io from 'socket.io-client';

const gameHost = argv.host ? argv.host : 'http://localhost'
const gamePort = argv.port ? argv.port : 5000

const socket = io(`${gameHost}:${gamePort}`)
const redSwitch = new Switch(4, 'in', 'both', { debounceTimeout: 10 })
const blueSwitch = new Switch(17, 'in', 'both', { debounceTimeout: 10 })

const compareValues = () => {

  if (!redSwitch) return false;
  if (!blueSwitch) return false;

  if (Math.abs(redSwitch.date - blueSwitch.date) <= 1000) {
    socket.emit('pauseTimer', { name: 'villains' })
    socket.emit('doSuccess', { name: 'villains' })
  }

  else {
    socket.emit('customEvent', { name: 'villains', event: 'denied' })
  }

}

redSwitch.on('value', compareValues)
blueSwitch.on('value', compareValues)