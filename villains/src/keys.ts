import { Switch } from './lib/Switch';
import { argv } from 'optimist'
import * as io from 'socket.io-client';

const gameHost = argv.host ? argv.host : 'http://localhost'
const gamePort = argv.port ? argv.port : 5000

const socket = io(`${gameHost}:${gamePort}`)
const redSwitch = new Switch(5, 'in', 'both', { debounceTimeout: 100 })
const blueSwitch = new Switch(6, 'in', 'both', { debounceTimeout: 100 })

const compareValues = () => {

  if (!redSwitch.value) return false;
  if (!blueSwitch.value) return false;
  
   if (Math.abs(redSwitch.date - blueSwitch.date) <= 2000) {
    socket.emit('pauseTimer', { name: 'superhero' })
    socket.emit('doSuccess', { name: 'superhero' })
  }

  else {
    socket.emit('customEvent', { name: 'superhero', event: 'denied' })
  }

}

redSwitch.on('value', compareValues)
blueSwitch.on('value', compareValues)