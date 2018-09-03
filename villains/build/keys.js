"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { Switch } from './lib/Switch';
const optimist_1 = require("optimist");
const io = require("socket.io-client");
const gameHost = optimist_1.argv.host ? optimist_1.argv.host : 'http://localhost';
const gamePort = optimist_1.argv.port ? optimist_1.argv.port : 5000;
const socket = io(`${gameHost}:${gamePort}`);
// const redSwitch = new Switch(4, 'in', 'both', { debounceTimeout: 10 });
// const blueSwitch = new Switch(17, 'in', 'both', { debounceTimeout: 10 });
// socket.on('connect', () => {
setTimeout(() => {
    socket.emit('pauseTimer', {
        name: 'villains'
    });
    socket.emit('doSuccess', {
        name: 'villains'
    });
}, 2000);
// })
//# sourceMappingURL=keys.js.map