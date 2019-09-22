"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Switch_1 = require("./lib/Switch");
const SocketIO = require("socket.io");
const optimist_1 = require("optimist");
const express = require("express");
const http_1 = require("http");
const path = require("path");
const node_lifx_1 = require("node-lifx");
const client = new node_lifx_1.Client();
const port = optimist_1.argv.port ? optimist_1.argv.port : 5000;
const app = express();
const server = new http_1.Server(app);
const io = SocketIO(server, { origins: '*:*' });
io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});
server.listen(port);
const publicDir = path.resolve(__dirname + '/../public');
console.log(publicDir);
app.use(express.static(publicDir));
const lights = [];
const lightsFull = function () {
    lights.forEach(light => {
        light.on(0);
        //light.color(360, 100, 100, 3500, 500)
        light.colorRgb(255, 255, 255, 500);
    });
};
const lightsReset = function () {
    lights.forEach(light => {
        light.on(0);
        //light.color(360, 100, 100, 3500, 500)
        light.colorRgb(0, 255, 0, 500);
    });
};
const dimLights = function () {
    lights.forEach(light => {
        light.on(0);
        light.color(360, 100, 5, 3500, 500);
    });
};
client.on('light-new', function (light) {
    lights.push(light);
    lightsReset();
    setTimeout(function () {
        lightsFull();
    }, 1500);
});
client.init();
/**
 * PI Stuff
 */
const debounce = 200;
const magnets = new Switch_1.Switch(17, 'in', 'both', { debounceTimeout: debounce });
const reset = new Switch_1.Switch(27, 'in', 'rising', { debounceTimeout: debounce });
const override = new Switch_1.Switch(22, 'in', 'rising', { debounceTimeout: debounce });
const config = {
    activated: false
};
io.on('connect', socket => {
    console.log('client connected', socket.id);
    socket.on('video-ended', data => {
        console.log('video ended');
        lightsFull();
    });
});
magnets.on('value', () => {
    console.log('magnets', magnets.value);
    if (magnets.value && config.activated === false) {
        io.emit('play-video');
        config.activated = true;
        dimLights();
        console.log('Triggering video');
    }
});
override.on('value', () => {
    console.log('override', override.value);
    if (override.value && config.activated === false) {
        io.emit('play-video');
        config.activated = true;
        dimLights();
        console.log('Triggering video (override)');
    }
});
reset.on('value', () => {
    console.log('reset', magnets.value);
    if (reset.value === true && config.activated === true) {
        io.emit('reset');
        config.activated = false;
        lightsReset();
        setTimeout(function () {
            lightsFull();
        }, 1500);
        console.log('resetting');
    }
});
//# sourceMappingURL=pentagram.js.map