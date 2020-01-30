import { Switch } from './lib/Switch';
import { Gpio as GPIO } from 'onoff'

const debounce = 200;
const trigger = new Switch(17, 'in', 'rising', { debounceTimeout: debounce })
const reset = new Switch(27, 'in', 'rising', { debounceTimeout: debounce })

const lock = new GPIO(4, 'out');

trigger.on('value', on => {
  console.log('trigger')
  lock.writeSync(1);
})

reset.on('value', on => {
  console.log('reset', lock.readSync())
  if (lock.readSync()) return lock.writeSync(0);
  return lock.writeSync(1);
})