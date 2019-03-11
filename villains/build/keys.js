"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Switch_1 = require("./lib/Switch");
const optimist_1 = require("optimist");
const io = require("socket.io-client");
const gameHost = optimist_1.argv.host ? optimist_1.argv.host : 'http://localhost';
const gamePort = optimist_1.argv.port ? optimist_1.argv.port : 5000;
const socket = io(`${gameHost}:${gamePort}`);
const redSwitch = new Switch_1.Switch(16, 'in', 'both', { debounceTimeout: 100 });
const blueSwitch = new Switch_1.Switch(26, 'in', 'both', { debounceTimeout: 100 });
const compareValues = () => {
    console.log('red', redSwitch.value);
    console.log('blue', blueSwitch.value);
    console.log('--');
    if (!redSwitch.value)
        return false;
    if (!blueSwitch.value)
        return false;
    if (Math.abs(redSwitch.date - blueSwitch.date) <= 2000) {
        socket.emit('pauseTimer', { name: 'villains' });
        socket.emit('doSuccess', { name: 'villains' });
    }
    else {
        socket.emit('customEvent', { name: 'villains', event: 'denied' });
    }
};
redSwitch.on('value', compareValues);
blueSwitch.on('value', compareValues);
//# sourceMappingURL=keys.js.map