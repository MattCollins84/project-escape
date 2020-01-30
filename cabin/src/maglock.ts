import { Switch } from './lib/Switch';

const debounce = 200;
const trigger = new Switch(17, 'in', 'rising', { debounceTimeout: debounce })
const reset = new Switch(27, 'in', 'rising', { debounceTimeout: debounce })

const lock = new Switch(4, 'out', 'rising', { debounceTimeout: debounce })

trigger.on('value', () => {
  lock.switchOn()
})

reset.on('value', () => {
  if (lock.value) return lock.switchOff();
  return lock.switchOn()
})