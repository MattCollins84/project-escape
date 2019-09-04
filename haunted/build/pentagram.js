"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SocketIO = require("socket.io");
const optimist_1 = require("optimist");
const express = require("express");
const http_1 = require("http");
const path = require("path");
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
// app.get('/', function (req, res) {
//   const file = path.resolve(__dirname + '/../public/index.html');
//   console.log(file);
//   return res.sendFile(file);
// });
/**
 * PI Stuff
 */
// const debounce = 200;
// const magnets = new Switch(17, 'in', 'both', { debounceTimeout: debounce });
// const reset = new Switch(27, 'in', 'both', { debounceTimeout: debounce });
// const config = {
//   activated: false
// }
// io.on('connect', socket => {
//   console.log('client connected', socket.id)
// })
// magnets.on('value', () => {
//   console.log(magnets.value)
//   if (magnets.value && config.activated === false) {
//     io.emit('play-video');
//     config.activated = true;
//     console.log('Triggering video')
//   }
// })
// reset.on('value', () => {
//   if (reset.value === true && config.activated === true) {
//     io.emit('reset');
//     config.activated = false;
//     console.log('resetting')
//   }
// })
//# sourceMappingURL=pentagram.js.map