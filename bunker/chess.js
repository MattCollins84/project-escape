const GPIO = require('onoff').Gpio;
const lock = new GPIO(4, 'out');

const circuits = [
  { colour: 'red', set: false, pin: new GPIO(17, 'in', 'both', { debounceTimeout: 10 }) },
  { colour: 'green', set: false, pin: new GPIO(27, 'in', 'both', { debounceTimeout: 10 }) }
]

circuits.forEach(circuit => {
  circuit.pin.watch((err, value) => {
    if (err) return console.error('There was an error', err);
    updateCircuit(circuit, value)
  })
});

const updateCircuit = (circuit, value) => {
  circuit.set = value === 1 ? true : false;
  console.log(`${circuit.colour}: ${circuit.set}`)
  checkCircuits();
}

const checkCircuits = () => {
  const allSet = circuits.every(c => c.set === true);
  if (allSet) {
    console.log("All circuits are set");
    lock.writeSync(1);
  } else {
    const missing = circuits.filter(circuit => !circuit.set).map(circuit => circuit.colour)
    console.log(`Still missing ${missing.join(", ")}`)
    lock.writeSync(0);
  }
}

//function to run when exiting program
function unexportOnClose() {
  circuits.forEach(circuit => {
    circuit.pin.unexport();
  });
};

//function to run when user closes using ctrl+c
process.on('SIGINT', unexportOnClose);