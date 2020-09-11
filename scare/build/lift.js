"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    console.log('socket connected', socket.id);
});
server.listen(port, () => {
    console.log('listening on port', port);
});
const publicDir = path.resolve(__dirname + '/../public');
console.log(publicDir);
app.use(express.static(publicDir));
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
const lightsReset = function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('reset lights');
        lights.forEach((light) => __awaiter(this, void 0, void 0, function* () {
            light.on(0);
            yield wait(1000);
            light.colorRgb(0, 255, 0, 500);
            yield wait(1500);
            light.colorRgb(255, 255, 255, 500);
            yield wait(1500);
        }));
    });
};
// lights go pale red
const emergencyLights = function (transition = 500) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('emergency lights');
        lights.forEach((light) => __awaiter(this, void 0, void 0, function* () {
            light.on(0);
            light.colorRgb(255, 117, 117, transition);
        }));
    });
};
const flickerLights = function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('flickering lights');
        lights.forEach((light) => __awaiter(this, void 0, void 0, function* () {
            light.off(0);
            light.on(200);
            yield wait(500);
            light.off(0);
            light.on(200);
            light.off(0);
            light.on(200);
            yield wait(500);
            light.off(0);
            yield wait(750);
            light.on(500);
            yield wait(500);
            light.off(0);
            light.on(200);
            light.off(0);
            light.on(200);
            yield wait(500);
            light.off(0);
            yield wait(750);
            light.on(500);
            yield wait(500);
            light.off(0);
            light.on(200);
            light.off(0);
            light.on(200);
            yield wait(500);
            light.off(0);
            yield wait(750);
            light.on(500);
            yield wait(500);
            // ending
            light.off(200);
            yield wait(500);
        }));
    });
};
client.on('light-new', function (light) {
    return __awaiter(this, void 0, void 0, function* () {
        lights.push(light);
        yield lightsReset();
        yield wait(2000);
    });
});
client.init();
const wait = (time) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise(resolve => {
        setTimeout(() => {
            return resolve();
        }, time);
    });
});
/**
 * PI Stuff
 */
const debounce = 200;
const trigger = new Switch_1.Switch(17, 'in', 'both', { debounceTimeout: debounce });
const reset = new Switch_1.Switch(27, 'in', 'rising', { debounceTimeout: debounce });
const override = new Switch_1.Switch(22, 'in', 'rising', { debounceTimeout: debounce });
const config = {
    activated: false
};
io.on('connect', socket => {
    console.log('client connected', socket.id);
    socket.on('video-ended', data => {
        console.log('video ended');
        // lightsFull()
    });
});
trigger.on('value', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('trigger', trigger.value);
    if (trigger.value && config.activated === false) {
        io.emit('play-video');
        config.activated = true;
        console.log('Triggering video');
        yield wait(3000);
        yield flickerLights();
        yield emergencyLights();
    }
}));
override.on('value', () => {
    console.log('override', override.value);
    // if (override.value && config.activated === false) {
    //   io.emit('play-video');
    //   config.activated = true;
    //   console.log('Triggering video (override)')
    // }
});
reset.on('value', () => {
    console.log('reset', reset.value);
    // if (reset.value === true && config.activated === true) {
    //   io.emit('reset');
    //   config.activated = false;
    //   lightsReset()
    //   setTimeout(function() {
    //     lightsFull()
    //   }, 1500)
    //   console.log('resetting')
    // }
});
//# sourceMappingURL=lift.js.map