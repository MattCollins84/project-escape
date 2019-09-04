"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const io = require("socket.io-client");
const optimist_1 = require("optimist");
const host = optimist_1.argv.host ? optimist_1.argv.host : 'http://localhost';
const port = optimist_1.argv.port ? optimist_1.argv.port : 5000;
const socket = io(`${host}:${port}`);
socket.on('connect', () => {
    console.log('connected to server');
});
socket.on('play-video', () => {
    console.log('playing video');
});
//# sourceMappingURL=video-client.js.map