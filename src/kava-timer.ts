import { core } from '@playkit-js/kaltura-player-js';
const { FakeEvent, FakeEventTarget } = core;

const SECOND: number = 1000;

/**
 * Create service worker with timer.
 * @private
 * @class WorkerTimer
 * @param {void} callback - callback that triggers on timer tick.
 * @param {number} interval - interval in ms.
 */
class WorkerTimer {
  private worker: Worker | null = null;
  constructor(callback, interval) {
    const blob = new Blob([`setInterval(() => postMessage(0), ${interval});`]);
    const workerScript = URL.createObjectURL(blob);
    this.worker = new Worker(workerScript);
    this.worker.onmessage = callback;
  }

  /**
   * Terminate service worker.
   * @returns {void}
   * @memberof WorkerTimer
   * @instance
   */
  public stop(): void {
    if (this.worker) {
      this.worker.terminate();
    }
  }
}

/**
 * Mange a timer and dispatches related events.
 * @private
 * @class KavaTimer
 * @param {Object} config - The timer config.
 */
class KavaTimer extends FakeEventTarget {
  private _resetCounter!: number;
  private _eventCounter!: number;
  private _timer?: WorkerTimer | null;
  private _stopped!: boolean;
  private _config: any;

  public static Event = {
    TICK: 'tick',
    RESET: 'reset',
    REPORT: 'report'
  };

  constructor(config: any) {
    super();
    this._config = config;
  }

  /**
   * Starts the timer interval.
   * @returns {void}
   * @memberof KavaTimer
   * @instance
   */
  public start(): void {
    this._terminateTimer();
    this._stopped = false;
    this._resetCounter = 0;
    this._eventCounter = 0;
    this._timer = new WorkerTimer(() => this._monitor(), SECOND);
  }

  /**
   * Continues the timer to dispatch REPORT.
   * @returns {void}
   * @memberof KavaTimer
   * @instance
   */
  public resume(): void {
    this._stopped = false;
    this._resetCounter = 0;
  }

  /**
   * Stops the timer from dispatch REPORT and starts the timer to dispatch RESET.
   * @returns {void}
   * @memberof KavaTimer
   * @instance
   */
  public stop(): void {
    this._stopped = true;
  }

  /**
   * @returns {boolean} - Whether the timer is stopped.
   * @memberof KavaTimer
   * @instance
   */
  public isStopped(): boolean {
    return this._stopped;
  }

  /**
   * Destroys the timer.
   * @returns {void}
   * @memberof KavaTimer
   * @instance
   */
  public destroy(): void {
    this._terminateTimer();
  }

  private _terminateTimer(): void {
    if (this._timer) {
      this._timer.stop();
      this._timer = null;
    }
  }

  private _monitor(): void {
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

export { KavaTimer };
