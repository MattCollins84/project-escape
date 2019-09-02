"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Switch_1 = require("./lib/Switch");
const SocketIO = require("socket.io");
const optimist_1 = require("optimist");
const port = optimist_1.argv.port ? optimist_1.argv.port : 5000;
const io = SocketIO(port);
const debounce = 200;
const magnets = new Switch_1.Switch(17, 'in', 'both', { debounceTimeout: debounce });
const config = {
    activated: false
};
io.on('connect', id => {
    console.log('client connected', id);
});
magnets.on('value', () => {
    console.log(magnets.value);
    if (magnets.value && config.activated === false) {
        io.emit('play-video');
        config.activated = true;
        console.log('Triggering video');
    }
});
//# sourceMappingURL=pentagram.js.map