import { Switch } from './lib/Switch';

const debounce = 200;
const magnets = new Switch(17, 'in', 'both', { debounceTimeout: debounce });

magnets.on('value', () => {
  console.log(magnets.value)
})