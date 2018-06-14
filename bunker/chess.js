const GPIO = require('onoff').Gpio;
const lock = new GPIO(4, 'out');
const magnet = new GPIO(17, 'in', 'both', { debounceTimeout: 10 });

magnet.watch((err, value) => {
  if (err) return console.error('There was an error', err);
  console.log(value);
  lock.writeSync(value ^ 1)
})

//function to run when exiting program
function unexportOnClose() {
  lock.unexport();
  magnet.unexport();
};

//function to run when user closes using ctrl+c
process.on('SIGINT', unexportOnClose);