import { Switch } from './lib/Switch';
import { argv } from 'optimist'
import * as io from 'socket.io-client';

const gameHost = argv.host ? argv.host : 'http://localhost'
const gamePort = argv.port ? argv.port : 5000

const socket = io(`${gameHost}:${gamePort}`)
const redSwitch = new Switch(4, 'in', 'both', { debounceTimeout: 100 })
const blueSwitch = new Switch(17, 'in', 'both', { debounceTimeout: 100 })

const compareValues = () => {

  // if (!redSwitch.value) return false;
  // if (!blueSwitch.value) return false;
  console.log('blue value', blueSwitch.value)
  console.log('red value', redSwitch.value)
  // if (blueSwitch.value) {
  //   socket.emit('pauseTimer', { name: 'superhero' })
  //   socket.emit('doSuccess', { name: 'superhero' })
  // }

  // else {
  //   socket.emit('customEvent', { name: 'superhero', event: 'denied' })
  // }

}

redSwitch.on('value', compareValues)
blueSwitch.on('value', compareValues)

console.log('hi')