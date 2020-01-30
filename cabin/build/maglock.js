"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Switch_1 = require("./lib/Switch");
const onoff_1 = require("onoff");
const debounce = 200;
const trigger = new Switch_1.Switch(17, 'in', 'rising', { debounceTimeout: debounce });
const reset = new Switch_1.Switch(27, 'in', 'rising', { debounceTimeout: debounce });
const lock = new onoff_1.Gpio(4, 'out');
trigger.on('value', on => {
    console.log('trigger');
    lock.writeSync(1);
});
reset.on('value', on => {
    console.log('reset', lock.readSync());
    if (lock.readSync())
        return lock.writeSync(1);
    return lock.writeSync(0);
});
//# sourceMappingURL=maglock.js.map