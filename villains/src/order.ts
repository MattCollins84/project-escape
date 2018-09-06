import { Switch } from './lib/Switch';

const one = new Switch(17, 'in', 'rising', { debounceTimeout: 100 })
const two = new Switch(27, 'in', 'rising', { debounceTimeout: 100 })
// const three = new Switch(17, 'in', 'rising', { debounceTimeout: 10 })
// const four = new Switch(17, 'in', 'rising', { debounceTimeout: 10 })
// const five = new Switch(17, 'in', 'rising', { debounceTimeout: 10 })
// const six = new Switch(17, 'in', 'rising', { debounceTimeout: 10 })

// const latch = new Switch(4, 'out')

const data = {
  lastNumber: null
}

const recordPush = (number: number) => {
  console.log(number)
  // if (data.lastNumber === null && number === 6) {
  //   data.lastNumber = 6;
  // } else if (data.lastNumber === 6 && number === 5) {
  //   data.lastNumber = 5;
  // } else if (data.lastNumber === 5 && number === 4) {
  //   data.lastNumber = 4;
  // } else if (data.lastNumber === 4 && number === 3) {
  //   data.lastNumber = 3;
  // } else if (data.lastNumber === 3 && number === 2) {
  //   data.lastNumber = 2;
  // } else if (data.lastNumber === 2 && number === 1) {
  //   data.lastNumber = 1;
  //   // latch.switchOn();
  // } else {
  //   data.lastNumber = null;
  // }
  if (data.lastNumber === null && number === 1) {
    data.lastNumber = 1;
  } else if (data.lastNumber === 1 && number === 2) {
    data.lastNumber = 2;
    console.log('Correct sequence!')
    console.log('resetting');
    data.lastNumber = null;
  } else {
    console.log('Invalid sequence!')
    data.lastNumber = null;
    console.log('resetting')
  }
}

one.on('value', () => {
  recordPush(1)
})
two.on('value', () => {
  recordPush(2)
})
// three.on('value', () => {
//   recordPush(3)
// })
// four.on('value', () => {
//   recordPush(4)
// })
// five.on('value', () => {
//   recordPush(5)
// })
// six.on('value', () => {
//   recordPush(6)
// })