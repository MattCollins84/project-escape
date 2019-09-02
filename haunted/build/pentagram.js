"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Switch_1 = require("./lib/Switch");
const debounce = 200;
const magnets = new Switch_1.Switch(17, 'in', 'both', { debounceTimeout: debounce });
magnets.on('value', () => {
    console.log(magnets.value);
});
//# sourceMappingURL=pentagram.js.map