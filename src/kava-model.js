// @flow
import {KavaEventModel, getEventModel} from './kava-event-model'

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

  constructor(model?: Object) {
    if (model) {
      this.updateModel(model);
    }
  }

  /**
   * Gets the partner ID.
   * KAVA plugin should override this method.
   * @returns {string} - The partner ID.
   */
  getPartnerId(): string {
    return '';
  }

  /**
   * Gets the entry ID.
   * KAVA plugin should override this method.
   * @returns {string} - The entry ID.
   */
  getEntryId(): string {
    return '';
  }

  /**
   * Gets the session ID.
   * KAVA plugin should override this method.
   * @returns {string} - The session ID.
   */
  getSessionId(): string {
    return '';
  }

  /**
   * Gets the delivery type (dash, hls, url).
   * KAVA plugin should override this method.
   * @returns {string} - The delivery type.
   */
  getDeliveryType(): string {
    return '';
  }

  /**
   * Gets the playback type (vod, live, dvr).
   * KAVA plugin should override this method.
   * @returns {string} - The playback type.
   */
  getPlaybackType(): string {
    return '';
  }

  /**
   * Gets the client version.
   * KAVA plugin should override this method.
   * @returns {string} - The client version.
   */
  getClientVer(): string {
    return '';
  }

  /**
   * Gets the client tag.
   * KAVA plugin should override this method.
   * @returns {string} - The client tag.
   */
  getClientTag(): string {
    return '';
  }

  /**
   * Gets a position.
   * KAVA plugin should override this method.
   * @returns {number} - The position.
   */
  getPosition(): number {
    return -1;
  }

  /**
   * Gets the kaltura session.
   * KAVA plugin should override this method.
   * @returns {string} - The kaltura session.
   */
  getKS(): string {
    return '';
  }

  /**
   * Gets the UI conf ID.
   * KAVA plugin should override this method.
   * @returns {number} - The UI conf ID.
   */
  getUIConfId(): number {
    return -1;
  }

  /**
   * Gets a custom var.
   * KAVA plugin should override this method.
   * @returns {any} - The custom var.
   */
  getCustomVar1(): any {
    return null;
  }

  /**
   * Gets a custom var.
   * KAVA plugin should override this method.
   * @returns {any} - The custom var.
   */
  getCustomVar2(): any {
    return null;
  }

  /**
   * Gets a custom var.
   * KAVA plugin should override this method.
   * @returns {any} - The custom var.
   */
  getCustomVar3(): any {
    return null;
  }

  /**
   * Gets the current bitrate.
   * KAVA plugin should override this method.
   * @returns {number} - The current bitrate.
   */
  getActualBitrate(): number {
    return -1;
  }

  /**
   * Gets the average bitrate.
   * KAVA plugin should override this method.
   * @returns {number} - The average bitrate.
   */
  getAverageBitrate(): number {
    return -1;
  }

  /**
   * Gets the referrer.
   * @returns {string} - The referrer.
   */
  getReferrer(): string {
    return btoa(document.referrer || document.URL);
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
