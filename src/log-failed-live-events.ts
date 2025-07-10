/**
 * Logs failed events to browser's local storage
 * @param {any} error - The error that occurred
 * @param {KavaModel} model - The Kava model
 * @returns {void}
 */
import { KavaModel } from './kava-model';
import { LocalStorageManager } from '@playkit-js/kaltura-player-js';

const FAILED_LIVE_EVENT_KEY_PREFIX = 'FailedLiveEvent_';
const FAILED_LIVE_COUNTER_KEY_PREFIX = 'FailedLiveEventCounter_';
const NUM_OF_LOGGED_FAILED_EVENTS: number = 100;

export class LogFailedLiveEvents {
  //add costructor that get logger and config
  private logger: any;
  private numOfLoggedFailedEvents: any;
  constructor(logger: any, numOfLoggedFailedEvents: any) {
    this.logger = logger;
    this.numOfLoggedFailedEvents = numOfLoggedFailedEvents || NUM_OF_LOGGED_FAILED_EVENTS;
  }

  public loggedFailedLiveAnalyticsEventsToLocalStorage(error: any, model: KavaModel): void {
    // Get essential event info from model
    const eventType = model['eventType'] || 'unknown';
    const entryId = model['entryId'] || 'unknown';
    const sessionId = model['sessionId'] || 'unknown';
    const partnerId = model['partnerId'] || 'unknown';
    const position = model['position'] || 0;
    const errorDetails = model['errorDetails'] || null;
    const numOfLoggedFailedEvents = this.numOfLoggedFailedEvents;

    // Construct storage key
    const storageKey = `${FAILED_LIVE_EVENT_KEY_PREFIX}-${entryId}`;

    // Create the data object to store
    const dataToStore = {
      error: error,
      model: {
        // Store essential properties only to avoid localStorage size issues
        eventType,
        entryId,
        sessionId,
        partnerId,
        position,
        errorDetails
      }
    };

    //In case that we log error, add counter to the localstorage of how many failures
    const failureCountKey = this.getFailedCounterKey(entryId);
    try {
      const counter = LocalStorageManager.getItem(failureCountKey) || 0;
      LocalStorageManager.setItem(failureCountKey, counter + 1);
      this.appendNewFailedLiveEventToLocalStorage(dataToStore, storageKey, numOfLoggedFailedEvents);
    } catch (e) {
      this.logger.warn('Failed to store failed event in localStorage:', e);
    }
  }

  private appendNewFailedLiveEventToLocalStorage(data: any, storageKey: string, tailLength: number): void {
    //get the stored object from localStorage
    const storedObject = LocalStorageManager.getItem(storageKey);
    // If the stored object is not an array, initialize it
    let storedArray: any[] = storedObject ? storedObject : [];
    // Append the new data to the array
    storedArray.push({ date: new Date(), data });
    // If the array exceeds the tail length, remove the oldest items
    if (storedArray.length > tailLength) {
      storedArray = storedArray.slice(storedArray.length - tailLength);
    }
    // Store the updated array back to localStorage
    LocalStorageManager.setItem(storageKey, JSON.stringify(storedArray));
  }

  public getFailedCounterKey(entryId: string): string {
    return `${FAILED_LIVE_COUNTER_KEY_PREFIX}-${entryId}`;
  }

  public getNumFailedAnalyticReports(): number {
    return parseInt(LocalStorageManager.getItem(this._logFailedLiveEvents.getFailedCounterKey(this.config.entryId)) || 0);
  }
}
