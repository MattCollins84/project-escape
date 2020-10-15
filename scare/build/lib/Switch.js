"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Switch = void 0;
const events_1 = require("events");
const onoff_1 = require("onoff");
class Switch extends events_1.EventEmitter {
    constructor(pin, direction, edge, options = {}) {
        super();
        this.pin = null;
        this.setDate = null;
        this.powerValue = false;
        this.pin = new onoff_1.Gpio(pin, direction, edge, options);
        this.powerValue = !!this.pin.readSync();
        console.log("PIN", pin, direction, this.powerValue);
        this.pin.watch((err, value) => {
            console.log('change', pin, err, value);
            if (err)
                return this.emit('error', err);
            this.powerValue = !!value;
            if (value) {
                this.setDate = new Date();
            }
            else {
                this.setDate = null;
            }
            return this.emit('value');
        });
    }
    get date() {
        return this.setDate ? this.setDate.getTime() : null;
    }
    get value() {
        return this.powerValue;
    }
    switchOn() {
        console.log('switch on');
        this.pin.writeSync(1);
    }
    switchOff() {
        console.log('switch off');
        this.pin.writeSync(0);
    }
}
exports.Switch = Switch;
//# sourceMappingURL=Switch.js.map