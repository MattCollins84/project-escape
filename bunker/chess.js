const GPIO = require('onoff').Gpio;
const lock = new Gpio(4, 'out');    // Export GPIO4 as an output

lock.writeSync(1)

const circuits = [
  { name: '1', set: false, pin: new GPIO(17, 'in', 'both', { debounceTimeout: 10 }) },
  // { name: '2', set: false, pin: new GPIO(27, 'in', 'both', { debounceTimeout: 10 }) },
  // { name: '3', set: false, pin: new GPIO(22, 'in', 'both', { debounceTimeout: 10 }) }
]

circuits.forEach(circuit => {
  circuit.pin.watch((err, value) => {
    if (err) return console.error('There was an error', err);
    updateCircuit(circuit, value)
  })
});

const updateCircuit = (circuit, value) => {
  circuit.set = value === 1 ? true : false;
  console.log(`${circuit.name}: ${circuit.set}`)
  checkCircuits();
}

const checkCircuits = () => {
  const allSet = circuits.every(c => c.set === true);
  if (allSet) {
    console.log("All circuits are set");
  } else {
    const missing = circuits.filter(circuit => !circuit.set).map(circuit => circuit.name)
    console.log(`Still missing ${missing.join(", ")}`)
  }
}

//function to run when exiting program
function unexportOnClose() {
  circuits.forEach(circuit => {
    circuit.pin.unexport();
  });
};


checkCircuits()

//function to run when user closes using ctrl+c
process.on('SIGINT', unexportOnClose);