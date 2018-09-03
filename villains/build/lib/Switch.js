"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const onoff_1 = require("onoff");
class Switch extends events_1.EventEmitter {
    constructor(pin, direction, edge, options = {}) {
        super();
        this.pin = null;
        this.setDate = null;
        this.pin = new onoff_1.Gpio(pin, direction, edge, options);
        this.pin.watch((err, value) => {
            if (err)
                return this.emit('error', err);
            if (value) {
                this.setDate = new Date();
            }
            else {
                this.setDate = null;
            }
            return this.emit('value', { value: value, when: this.setDate });
        });
    }
}
exports.Switch = Switch;
//# sourceMappingURL=Switch.js.map