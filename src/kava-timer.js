// @flow
import {FakeEvent, FakeEventTarget} from 'playkit-js';

const SECOND: number = 1000;

/**
 * Mange a timer and dispatches related events.
 * @constructor
 * @param {Object} config - The timer config.
 */
class KavaTimer extends FakeEventTarget {
  _resetCounter: number;
  _eventCounter: number;
  _intervalId: ?number;
  _stopped: boolean;
  _config: Object;

  static Event = {
    TICK: 'tick',
    RESET: 'reset',
    REPORT: 'report'
  };

  constructor(config: Object) {
    super();
    this._config = config;
  }

  /**
   * Starts the timer interval.
   * @public
   * @returns {void}
   */
  start(): void {
    this._clearTimeout();
    this._stopped = false;
    this._resetCounter = 0;
    this._eventCounter = 0;
    this._intervalId = setInterval(() => this._monitor(), SECOND);
  }

  /**
   * Continues the timer to dispatch REPORT.
   * @public
   * @returns {void}
   */
  resume(): void {
    this._stopped = false;
    this._resetCounter = 0;
  }

  /**
   * Stops the timer from dispatch REPORT and starts the timer to dispatch RESET.
   * @public
   * @returns {void}
   */
  stop(): void {
    this._stopped = true;
  }

  /**
   * @public
   * @returns {boolean} - Whether the timer is stopped.
   */
  isStopped(): boolean {
    return this._stopped;
  }

  /**
   * Destroys the timer.
   * @public
   * @returns {void}
   */
  destroy(): void {
    this._clearTimeout();
  }

  _clearTimeout(): void {
    if (this._intervalId) {
      clearInterval(this._intervalId);
      this._intervalId = null;
    }
  }

  _monitor(): void {
    if (this._stopped) {
      if (this._resetCounter === this._config.resetCounter) {
        this.dispatchEvent(new FakeEvent(KavaTimer.Event.RESET));
        this._resetCounter = 0;
        this._eventCounter = 0;
      }
      this._resetCounter++;
    } else {
      this.dispatchEvent(new FakeEvent(KavaTimer.Event.TICK));
      if (this._eventCounter === this._config.eventCounter) {
        this.dispatchEvent(new FakeEvent(KavaTimer.Event.REPORT));
        this._eventCounter = 0;
      }
      this._eventCounter++;
    }
  }
}

export {KavaTimer};
