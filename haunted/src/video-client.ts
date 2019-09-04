import * as io from 'socket.io-client';
import { argv } from 'optimist'

const host = argv.host ? argv.host : 'http://localhost'
const port = argv.port ? argv.port : 5000

const socket = io(`${host}:${port}`)

socket.on('connect', () => {
  console.log('connected to server')
})

socket.on('play-video', () => {
  console.log('playing video')
})