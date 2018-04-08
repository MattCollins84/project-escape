const GPIO = require('onoff').Gpio;
const LifxClient = require('node-lifx').Client;
const client = new LifxClient();

const circuits = [
  { colour: 'red', set: false, pin: new GPIO(17, 'in', 'both', { debounceTimeout: 10 }) },
  { colour: 'green', set: false, pin: new GPIO(27, 'in', 'both', { debounceTimeout: 10 }) },
  { colour: 'blue', set: false, pin: new GPIO(22, 'in', 'both', { debounceTimeout: 10 }) }
]

client.on('light-new', function(light) {
  
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
      console.log("All circuits are set")
    }
  }
  
});

client.init();

//function to run when exiting program
function unexportOnClose() {
  circuits.forEach(circuit => {
    circuit.pin.unexport();
  });
};

//function to run when user closes using ctrl+c
process.on('SIGINT', unexportOnClose);