"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Switch_1 = require("./lib/Switch");
const one = new Switch_1.Switch(17, 'in', 'rising', { debounceTimeout: 100 });
const two = new Switch_1.Switch(27, 'in', 'rising', { debounceTimeout: 100 });
// const three = new Switch(22, 'in', 'rising', { debounceTimeout: 10 })
const four = new Switch_1.Switch(26, 'in', 'rising', { debounceTimeout: 10 });
// const five = new Switch(17, 'in', 'rising', { debounceTimeout: 10 })
// const six = new Switch(17, 'in', 'rising', { debounceTimeout: 10 })
// const latch = new Switch(4, 'out')
const correctSequence = [1, 2, 4, 3, 2];
const enteredSequence = [];
const recordPush = (number) => {
    console.log(number);
    const index = enteredSequence.length;
    if (number === correctSequence[index]) {
        enteredSequence.push(number);
    }
    else {
        console.log('Invalid sequence!');
        enteredSequence.splice(0, enteredSequence.length);
    }
    if (enteredSequence.length === correctSequence.length) {
        console.log('Correct sequence!');
        enteredSequence.splice(0, enteredSequence.length);
    }
};
one.on('value', () => {
    recordPush(1);
});
two.on('value', () => {
    recordPush(2);
});
// three.on('value', () => {
//   recordPush(3)
// })
four.on('value', () => {
    recordPush(4);
});
// five.on('value', () => {
//   recordPush(5)
// })
// six.on('value', () => {
//   recordPush(6)
// })
//# sourceMappingURL=order.js.map