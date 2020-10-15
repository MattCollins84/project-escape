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
const lightsFull = async function(delay: number = 0, transition: number = 500) {
  for (let light of lights) {
    light.on(0);
    await wait(delay)
    light.colorRgb(255, 255, 255, transition)
  }
}

// reset lights (flash green to show reset)
const lightsReset = async function() {
  console.log('reset lights')
  for (let light of lights) {
    light.on(0);
    await wait(1000)
    light.colorRgb(0, 255, 0, 500)
    await wait(1500)
    light.colorRgb(255, 255, 255, 500)
    await wait(1500)
  }
}

// lights go pale red
const emergencyLights = async function(transition: number = 500) {
  console.log('emergency lights')
  for (let light of lights) {
    light.on(0);
    light.colorRgb(255, 117, 117, transition)
  }
}

const flicker = async function(light) {
  light.off(0);
  light.on(50);
  await wait (300)
  light.off(0);
  light.on(50);
  light.off(0);
  light.on(50);
  await wait(300)
}

const flicker2 = async function(light) {
  light.off(0);
  light.on(50);
  await wait(700)
  light.off(0);
  light.on(50);
  await wait(400)
  light.off(0);
  await wait(400)
  light.on(50);
  await wait(300)
}

const flicker3 = async function(light) {
  light.off(0);
  light.on(20);
  await wait(50)
  light.off(0);
  light.on(20);
  await wait(50)
  light.off(0);
  light.on(20);
  await wait(50)
  light.off(0);
  await wait(400);
  light.on(50);
  await wait(400);
}

const flickerLights = async function() {
  console.log('flickering lights')
  for (let light of lights) {
    await flicker(light)
    await flicker2(light)
    await flicker3(light)
    await flicker2(light)
    await flicker3(light)
    await flicker(light)

    // ending
    light.off(200);
    await wait(750);
  }
}

client.on('light-new', async function(light) {
  lights.push(light);
  await lightsReset()
  await wait(2000)
  // await flickerLights()
  // await emergencyLights()
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
const trigger = new Switch(17, 'in', 'both', { debounceTimeout: debounce });
const reset = new Switch(27, 'in', 'rising', { debounceTimeout: debounce });
const override = new Switch(22, 'in', 'rising', { debounceTimeout: debounce })
const motors = new Switch(4, 'out', null, { debounceTimeout: debounce })

const config = {
  activated: false
}

io.on('connect', socket => {
  console.log('client connected', socket.id)

  socket.on('video-ended', data => {
    console.log('video ended')
  })
});

trigger.on('value', async () => {
  
  console.log('trigger', trigger.value)

  if (trigger.value && config.activated === false) {
    io.emit('play-video');
    config.activated = true;
    console.log('Triggering video')
    await wait(1000);
    motors.switchOn()
    await wait(12000);
    await flickerLights();
    await emergencyLights();
    motors.switchOff()
    console.log('trigger complete')
  }

})

override.on('value', async () => {

  console.log('override', override.value)

  if (override.value && config.activated === false) {
    io.emit('play-video');
    config.activated = true;
    console.log('Triggering video')
    await wait(1000);
    motors.switchOn()
    await wait(12000);
    await flickerLights();
    await emergencyLights();
    motors.switchOff()
    console.log('override complete')
  }

})

reset.on('value', async () => {
  
  console.log('reset', reset.value)

  if (reset.value === true && config.activated === true) {
    io.emit('reset');
    console.log('resetting')
    config.activated = false;
    motors.switchOff()
    await lightsReset()
    await wait(1500);
    await lightsFull()
    console.log('reset complete')
  }

})