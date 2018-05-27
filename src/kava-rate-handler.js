// @flow

/**
 * Manage the video rates for the KAVA plugin.
 * @constructor
 */
export default class KavaRateHandler {
  _rates: Array<Object> = [];
  _isSwitchedToAbrMode: boolean = false;

  constructor() {
    this._rates = [];
    this._isSwitchedToAbrMode = false;
  }

  /**
   * Sets the video rates.
   * @param {Array<number>} rates - The video rates.
   * @public
   * @returns {void}
   */
  setRates(rates: Array<number>): void {
    this._rates = [];
    rates.forEach(rate => {
      this._rates.push({
        rate: rate,
        active: false,
        duration: 0
      });
    });
  }

  /**
   * Sets the current rate.
   * @param {number} rate - The current rate.
   * @public
   * @returns {void}
   */
  setCurrent(rate: number): void {
    if (rate === 0) {
      this._isSwitchedToAbrMode = true;
    } else {
      this._rates.forEach(o => o.active = false);
      const obj = this._rates.find(o => o.rate === rate);
      if (obj) {
        obj.active = true;
      }
    }
  }

  /**
   * Gets the current rate.
   * @public
   * @returns {number} - The current rate.
   */
  getCurrent(): number {
    if (this._isSwitchedToAbrMode) {
      this._isSwitchedToAbrMode = false;
      return 0;
    }
    const current = this._rates.find(o => o.active);
    return current ? current.rate : -1;
  }

  /**
   * Increases the duration of the current rate.
   * @public
   * @returns {void}
   */
  countCurrent(): void {
    const current = this._rates.find(o => o.active);
    if (current) {
      current.duration++;
    }
  }

  /**
   * Gets the average rate.
   * @public
   * @returns {number} - The average rate.
   */
  getAverage(): number {
    let totalDuration = 0;
    let sum = 0;
    this._rates.forEach(o => {
      sum += (o.rate * o.duration);
      totalDuration += o.duration;
    });
    return totalDuration ? sum / totalDuration : 0;
  }

  /**
   * Resets the duration of all rates.
   * @public
   * @returns {void}
   */
  reset(): void {
    this._rates.forEach(o => o.duration = 0);
  }

  /**
   * Destroys the class.
   * @public
   * @returns {void}
   */
  destroy(): void {
    this._rates = [];
  }
}
