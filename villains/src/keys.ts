import { Switch } from './lib/Switch';
import { argv } from 'optimist'
import * as io from 'socket.io-client';

const gameHost = argv.host ? argv.host : 'http://localhost'
const gamePort = argv.port ? argv.port : 5000

const socket = io(`${gameHost}:${gamePort}`)
const redSwitch = new Switch(16, 'in', 'both', { debounceTimeout: 100 })
const blueSwitch = new Switch(26, 'in', 'both', { debounceTimeout: 100 })

const compareValues = () => {
  console.log('red', redSwitch.value)
  console.log('blue', blueSwitch.value)
  console.log('--')
  if (!redSwitch.value) return false;
  if (!blueSwitch.value) return false;
  
   if (Math.abs(redSwitch.date - blueSwitch.date) <= 2000) {
    socket.emit('pauseTimer', { name: 'villains' })
    socket.emit('doSuccess', { name: 'villains' })
  }

  else {
    socket.emit('customEvent', { name: 'villains', event: 'denied' })
  }

}

redSwitch.on('value', compareValues)
blueSwitch.on('value', compareValues)