import { EventEmitter } from "events";
import { Gpio } from 'onoff'

type TDirection = 'in' | 'out' | 'high' | 'low'
type TEdge = 'none' | 'rising' | 'falling' | 'both'
interface ISwitchOptions {
  debounceTimeout?: number
  activeLow?: boolean
  reconfigureDirection?: boolean
}

export class Switch extends EventEmitter {

  private pin: Gpio = null;
  private setDate: Date = null;
  private powerValue: boolean = false;

  constructor(pin: number, direction: TDirection, edge?: TEdge, options: ISwitchOptions = {}) {
    super();
    this.pin = new Gpio(pin, direction, edge, options)
    this.powerValue = !!this.pin.readSync()
    console.log("PIN", pin, direction, this.powerValue)

    this.pin.watch((err, value) => {
      console.log('change', pin, err, value)
      if (err) return this.emit('error', err);
      this.powerValue = !!value;
      if (value) {
        this.setDate = new Date();
      } else {
        this.setDate = null;
      }
      return this.emit('value')
    })
  }

  get date() {
    return this.setDate ? this.setDate.getTime() : null;
  }

  get value() {
    return this.powerValue
  }

  switchOn() {
    console.log('switch on')
    this.pin.writeSync(1)
  }

  switchOff() {
    console.log('switch off')
    this.pin.writeSync(0)
  }
}