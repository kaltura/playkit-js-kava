// @flow
import {getEventModel} from './kava-event-model';

/**
 * The KAVA model that stores data.
 * @constructor
 * @param {?Object} - Initial model.
 */
export default class KavaModel {
  sessionStartTime: number;
  eventIndex: number;
  playTimeSum: number;
  bufferTime: number;
  bufferTimeSum: number;
  language: string;
  caption: string;
  errorCode: number;
  joinTime: number;
  targetPosition: number;
  getActualBitrate: Function;
  getAverageBitrate: Function;
  getPartnerId: Function;
  getEntryId: Function;
  getSessionId: Function;
  getClientVer: Function;
  getClientTag: Function;
  getKS: Function;
  getUIConfId: Function;
  getReferrer: Function;
  getCustomVar1: Function;
  getCustomVar2: Function;
  getCustomVar3: Function;
  getPosition: Function;
  getDeliveryType: Function;
  getPlaybackType: Function;
  getPlaybackContext: Function;
  getApplicationVersion: Function;

  constructor(model?: Object) {
    if (model) {
      this.updateModel(model);
    }
  }

  /**
   * Gets the total play time.
   * @returns {number} - The play time sum.
   */
  getPlayTimeSum(): number {
    return this.playTimeSum;
  }

  /**
   * Gets the buffer time.
   * @returns {number} - The buffer time.
   */
  getBufferTime(): number {
    return this.bufferTime;
  }

  /**
   * Gets the total buffer time.
   * @returns {number} - The total buffer time.
   */
  getBufferTimeSum(): number {
    return this.bufferTimeSum;
  }

  /**
   * Gets the join time.
   * @returns {number} - The join time.
   */
  getJoinTime(): number {
    return this.joinTime;
  }

  /**
   * Gets a target position
   * @returns {number} - The target position.
   */
  getTargetPosition(): number {
    return this.targetPosition;
  }

  /**
   * Gets an audio language.
   * @returns {string} - The audio language.
   */
  getLanguage(): string {
    return this.language;
  }

  /**
   * Gets a caption language.
   * @returns {string} - The caption language.
   */
  getCaption(): string {
    return this.caption;
  }

  /**
   * Gets the error code.
   * @returns {number} - The error code.
   */
  getErrorCode(): number {
    return this.errorCode;
  }

  /**
   * Gets the event index counter.
   * @returns {number} - The event index counter.
   */
  getEventIndex(): number {
    return this.eventIndex;
  }

  /**
   * Gets the session start time.
   * @returns {number} - The session start time.
   */
  getSessionStartTime(): number {
    return this.sessionStartTime;
  }

  /**
   * Updates the model.
   * @param {Object} obj - A partial or full updated model.
   * @returns {void}
   */
  updateModel(obj: Object): void {
    Object.assign(this, obj);
  }

  /**
   * Gets the model for a certain event.
   * @param {KavaEvent} eventObj - The event object.
   * @returns {Object} - The event model.
   */
  getModel(eventObj: KavaEvent): Object {
    return getEventModel(eventObj, this);
  }
}
