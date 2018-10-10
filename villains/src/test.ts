import { argv } from 'optimist'
import * as io from 'socket.io-client';

const gameHost = argv.host ? argv.host : 'http://localhost'
const gamePort = argv.port ? argv.port : 5000

const socket = io(`${gameHost}:${gamePort}`)

const win = () => {
  socket.emit('pauseTimer', { name: 'villains' })
  socket.emit('doSuccess', { name: 'villains' })
}

const lose = () => {
  socket.emit('customEvent', { name: 'villains', event: 'denied' })
}

setTimeout(lose, 3000)