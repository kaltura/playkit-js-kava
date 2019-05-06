// @flow
import {getEventModel} from './kava-event-model';

/**
 * The KAVA model that stores data.
 * @class KavaModel
 * @private
 * @param {?Object} - Initial model.
 */
class KavaModel {
  sessionStartTime: number;
  eventIndex: number;
  playTimeSum: number;
  bufferTime: number;
  bufferTimeSum: number;
  language: string;
  caption: string;
  errorCode: number;
  errorDetails: any;
  joinTime: number;
  canPlayTime: number;
  targetPosition: number;
  getActualBitrate: Function;
  getAverageBitrate: Function;
  getPartnerId: Function;
  getEntryId: Function;
  getPlaylistId: Function;
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
  getCanPlayTime: Function;

  constructor(model?: Object) {
    if (model) {
      this.updateModel(model);
    }
  }

  /**
   * Gets the total play time.
   * @returns {number} - The play time sum.
   * @memberof KavaModel
   * @instance
   */
  getPlayTimeSum(): number {
    return this.playTimeSum;
  }

  getCanPlayTime(): number {
    return this.canPlayTime;
  }

  /**
   * Gets the buffer time.
   * @returns {number} - The buffer time.
   * @memberof KavaModel
   * @instance
   */
  getBufferTime(): number {
    return this.bufferTime;
  }

  /**
   * Gets the total buffer time.
   * @returns {number} - The total buffer time.
   * @memberof KavaModel
   * @instance
   */
  getBufferTimeSum(): number {
    return this.bufferTimeSum;
  }

  /**
   * Gets the join time.
   * @returns {number} - The join time.
   * @memberof KavaModel
   * @instance
   */
  getJoinTime(): number {
    return this.joinTime;
  }

  /**
   * Gets a target position
   * @returns {number} - The target position.
   * @memberof KavaModel
   * @instance
   */
  getTargetPosition(): number {
    return this.targetPosition;
  }

  /**
   * Gets an audio language.
   * @returns {string} - The audio language.
   * @memberof KavaModel
   * @instance
   */
  getLanguage(): string {
    return this.language;
  }

  /**
   * Gets a caption language.
   * @returns {string} - The caption language.
   * @memberof KavaModel
   * @instance
   */
  getCaption(): string {
    return this.caption;
  }

  /**
   * Gets the error code.
   * @returns {number} - The error code.
   * @memberof KavaModel
   * @instance
   */
  getErrorCode(): number {
    return this.errorCode;
  }

  /**
   * Gets the error additional data.
   * @returns {any} - The error data.
   * @memberof KavaModel
   * @instance
   */
  getErrorDetails(): any {
    return this.errorDetails;
  }

  /**
   * Gets the event index counter.
   * @returns {number} - The event index counter.
   * @memberof KavaModel
   * @instance
   */
  getEventIndex(): number {
    return this.eventIndex;
  }

  /**
   * Gets the session start time.
   * @returns {number} - The session start time.
   * @memberof KavaModel
   * @instance
   */
  getSessionStartTime(): number {
    return this.sessionStartTime;
  }

  /**
   * Updates the model.
   * @param {Object} obj - A partial or full updated model.
   * @returns {void}
   * @memberof KavaModel
   * @instance
   */
  updateModel(obj: Object): void {
    Object.assign(this, obj);
  }

  /**
   * Gets the model for a certain event.
   * @param {KavaEvent} eventObj - The event object.
   * @returns {Object} - The event model.
   * @memberof KavaModel
   * @instance
   */
  getModel(eventObj: KavaEvent): Object {
    return getEventModel(eventObj, this);
  }
}

export {KavaModel};
