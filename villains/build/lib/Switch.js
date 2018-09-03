import { EventEmitter } from "events";
import { Gpio } from 'onoff';
'in' | 'out' | 'high' | 'low';
'none' | 'rising' | 'falling' | 'both';
export class Switch extends EventEmitter {
    constructor(pin, direction, edge, options = {}) {
        super();
        this.pin = null;
        this.setDate = null;
        this.powerValue = false;
        this.pin = new Gpio(pin, direction, edge, options);
        this.pin.watch((err, value) => {
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
        this.pin.writeSync(1);
    }
    switchOff() {
        this.pin.writeSync(1);
    }
}
//# sourceMappingURL=Switch.js.map