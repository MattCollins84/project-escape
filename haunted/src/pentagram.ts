import { Switch } from './lib/Switch';

const debounce = 200;
const magnets = new Switch(17, 'in', 'rising', { debounceTimeout: debounce });

magnets.on('value', () => {
  console.log(this.value, magnets.value)
})