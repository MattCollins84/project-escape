"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const optimist_1 = require("optimist");
const io = require("socket.io-client");
const gameHost = optimist_1.argv.host ? optimist_1.argv.host : 'http://localhost';
const gamePort = optimist_1.argv.port ? optimist_1.argv.port : 5000;
const socket = io(`${gameHost}:${gamePort}`);
const win = () => {
    socket.emit('pauseTimer', { name: 'villains' });
    socket.emit('doSuccess', { name: 'villains' });
};
const lose = () => {
    socket.emit('customEvent', { name: 'villains', event: 'denied' });
};
setTimeout(lose, 3000);
//# sourceMappingURL=test.js.map