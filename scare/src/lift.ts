import { Switch } from './lib/Switch';
import * as SocketIO from 'socket.io';
import { argv } from 'optimist'
import * as express from 'express'
import { Server } from 'http'
import * as path from 'path'
import { Client as LifxClient } from 'node-lifx';
const client = new LifxClient();

const port = argv.port ? argv.port : 5000

const app = express();
const server = new Server(app);
const io = SocketIO(server, { origins: '*:*'})

io.on('connection', function (socket) {
  console.log('socket connected', socket.id)
});

server.listen(port, () => {
  console.log('listening on port', port)
})

const publicDir = path.resolve(__dirname + '/../public');
console.log(publicDir)
app.use(express.static(publicDir))

const lights = [];

// lights on, white
// const lightsFull = async function(delay: number = 0, transition: number = 500) {
//   lights.forEach(async light => {
//     light.on(0);
//     await wait(delay)
//     light.colorRgb(255, 255, 255, transition)
//   })
// }

// reset lights (flash green to show reset)
const lightsReset = async function() {
  console.log('reset lights')
  lights.forEach(async light => {
    light.on(0);
    await wait(1000)
    light.colorRgb(0, 255, 0, 500)
    await wait(1500)
    light.colorRgb(255, 255, 255, 500)
    await wait(1500)
  })
}

// lights go pale red
// const emergencyLights = async function(transition: number = 500) {
//   console.log('emergency lights')
//   lights.forEach(async light => {
//     light.on(0);
//     light.colorRgb(255, 117, 117, transition)
//   })
// }

// const flickerLights = async function() {
//   console.log('flickering lights')
//   lights.forEach(async light => {
//     light.off(0);
//     light.on(200);
//     await wait (500)
//     light.off(0);
//     light.on(200);
//     light.off(0);
//     light.on(200);
//     await wait(500)
//     light.off(0)
//     await wait(750)
//     light.on(500)
//     await wait(500)
//   })
// }

client.on('light-new', async function(light) {
  lights.push(light);
  await lightsReset()
  await wait(2000)
});

client.init()

const wait = async (time: number) => {
  return new Promise(resolve => {
    setTimeout(() => {
      return resolve()
    }, time)
  })
}

/**
 * PI Stuff
 */
const debounce = 200;
const button = new Switch(17, 'in', 'both', { debounceTimeout: debounce });
const reset = new Switch(27, 'in', 'rising', { debounceTimeout: debounce });
const override = new Switch(22, 'in', 'rising', { debounceTimeout: debounce })

const config = {
  activated: false
}

io.on('connect', socket => {
  console.log('client connected', socket.id)

  socket.on('video-ended', data => {
    console.log('video ended')
    // lightsFull()
  })
});

button.on('value', () => {
  
  console.log('button', button.value)

  if (button.value && config.activated === false) {
    io.emit('play-video');
    config.activated = true;
    console.log('Triggering video')
  }

})

override.on('value', () => {

  console.log('override', override.value)

  // if (override.value && config.activated === false) {
  //   io.emit('play-video');
  //   config.activated = true;
  //   console.log('Triggering video (override)')
  // }

})

reset.on('value', () => {
  
  console.log('reset', reset.value)

  // if (reset.value === true && config.activated === true) {
  //   io.emit('reset');
  //   config.activated = false;
  //   lightsReset()
  //   setTimeout(function() {
  //     lightsFull()
  //   }, 1500)
  //   console.log('resetting')
  // }

})