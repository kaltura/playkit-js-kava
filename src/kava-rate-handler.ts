/**
 * Manage the video rates for the KAVA plugin.
 * @private
 * @class KavaRateHandler
 */
class KavaRateHandler {
  _rates: any[] = [];

  constructor() {
    this._rates = [];
  }

  /**
   * Sets the video rates.
   * @param {Array<number>} rates - The video rates.
   * @returns {void}
   * @memberof KavaRateHandler
   * @instance
   */
  public setRates(rates: Array<number>): void {
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
   * @returns {void}
   * @memberof KavaRateHandler
   * @instance
   */
  public setCurrent(rate: number): void {
    this._rates.forEach(o => (o.active = false));
    const obj = this._rates.find(o => o.rate === rate);
    if (obj) {
      obj.active = true;
    }
  }

  /**
   * Gets the current rate.
   * @returns {number} - The current rate.
   * @memberof KavaRateHandler
   * @instance
   */
  public getCurrent(): number {
    const current = this._rates.find(o => o.active);
    return current ? current.rate : -1;
  }

  /**
   * Increases the duration of the current rate.
   * @returns {void}
   * @memberof KavaRateHandler
   * @instance
   */
  public countCurrent(): void {
    const current = this._rates.find(o => o.active);
    if (current) {
      current.duration++;
    }
  }

  /**
   * Gets the average rate.
   * @returns {number} - The average rate.
   * @memberof KavaRateHandler
   * @instance
   */
  public getAverage(): number {
    let totalDuration = 0;
    let sum = 0;
    this._rates.forEach(o => {
      sum += o.rate * o.duration;
      totalDuration += o.duration;
    });
    return totalDuration ? sum / totalDuration : 0;
  }

  /**
   * Resets the duration of all rates.
   * @returns {void}
   * @memberof KavaRateHandler
   * @instance
   */
  public reset(): void {
    this._rates.forEach(o => (o.duration = 0));
  }

  /**
   * Destroys the class.
   * @returns {void}
   * @memberof KavaRateHandler
   * @instance
   */
  public destroy(): void {
    this._rates = [];
  }
}

export {KavaRateHandler};
