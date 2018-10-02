import { Switch } from './lib/Switch';
import { Gpio as GPIO } from 'onoff'

const one = new Switch(23, 'in', 'rising', { debounceTimeout: 100 })
const two = new Switch(24, 'in', 'rising', { debounceTimeout: 100 })
const three = new Switch(25, 'in', 'rising', { debounceTimeout: 100 })
// const four = new Switch(26, 'in', 'rising', { debounceTimeout: 100 })
// const five = new Switch(17, 'in', 'rising', { debounceTimeout: 100 })
// const six = new Switch(17, 'in', 'rising', { debounceTimeout: 100 })

const lock = new GPIO(4, 'out');

// const latch = new Switch(4, 'out')

const correctSequence = [1, 2, 3]

const enteredSequence = [];

const recordPush = (number: number) => {
  console.log(number)

  const index = enteredSequence.length;

  if (number === correctSequence[index]) {
    enteredSequence.push(number)
  } else {
    console.log('Invalid sequence!')
    lock.writeSync(0);
    enteredSequence.splice(0, enteredSequence.length)
  }

  if (enteredSequence.length === correctSequence.length) {
    console.log('Correct sequence!')
    lock.writeSync(1);
    enteredSequence.splice(0, enteredSequence.length)
  }
}

one.on('value', () => {
  recordPush(1)
})
two.on('value', () => {
  recordPush(2)
})
three.on('value', () => {
  recordPush(3)
})
// four.on('value', () => {
//   recordPush(4)
// })
// five.on('value', () => {
//   recordPush(5)
// })
// six.on('value', () => {
//   recordPush(6)
// })