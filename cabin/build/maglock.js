"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Switch_1 = require("./lib/Switch");
const debounce = 200;
const trigger = new Switch_1.Switch(17, 'in', 'rising', { debounceTimeout: debounce });
const reset = new Switch_1.Switch(27, 'in', 'rising', { debounceTimeout: debounce });
const lock = new Switch_1.Switch(4, 'out', 'rising', { debounceTimeout: debounce });
trigger.on('value', () => {
    lock.switchOn();
});
reset.on('value', () => {
    if (lock.value)
        return lock.switchOff();
    return lock.switchOn();
});
//# sourceMappingURL=maglock.js.map