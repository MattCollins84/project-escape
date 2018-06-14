const GPIO = require('onoff').Gpio;
const lock = new GPIO(4, 'out');

setInterval(() => {
  const value = lock.readSync();
  console.log(value);
  lock.writeSync(value ^ 1);
}, 1000)

//function to run when exiting program
function unexportOnClose() {
  lock.unexport();
};

//function to run when user closes using ctrl+c
process.on('SIGINT', unexportOnClose);