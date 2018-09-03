"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Switch_1 = require("./lib/Switch");
const one = new Switch_1.Switch(4, 'in', 'rising', { debounceTimeout: 10 });
const two = new Switch_1.Switch(17, 'in', 'rising', { debounceTimeout: 10 });
const three = new Switch_1.Switch(17, 'in', 'rising', { debounceTimeout: 10 });
const four = new Switch_1.Switch(17, 'in', 'rising', { debounceTimeout: 10 });
const five = new Switch_1.Switch(17, 'in', 'rising', { debounceTimeout: 10 });
const six = new Switch_1.Switch(17, 'in', 'rising', { debounceTimeout: 10 });
const latch = new Switch_1.Switch(4, 'out');
const data = {
    lastNumber: null
};
const recordPush = (number) => {
    if (data.lastNumber === null && number === 6) {
        data.lastNumber = 6;
    }
    else if (data.lastNumber === 6 && number === 5) {
        data.lastNumber = 5;
    }
    else if (data.lastNumber === 5 && number === 4) {
        data.lastNumber = 4;
    }
    else if (data.lastNumber === 4 && number === 3) {
        data.lastNumber = 3;
    }
    else if (data.lastNumber === 3 && number === 2) {
        data.lastNumber = 2;
    }
    else if (data.lastNumber === 2 && number === 1) {
        data.lastNumber = 1;
        latch.switchOn();
    }
    else {
        data.lastNumber = null;
    }
};
one.on('value', () => {
    recordPush(1);
});
two.on('value', () => {
    recordPush(2);
});
three.on('value', () => {
    recordPush(3);
});
four.on('value', () => {
    recordPush(4);
});
five.on('value', () => {
    recordPush(5);
});
six.on('value', () => {
    recordPush(6);
});
//# sourceMappingURL=order.js.map