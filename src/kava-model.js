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
  joinTime: number;
  canPlayTime: number;
  targetPosition: number;
  targetBuffer: number;
  totalSegmentsDownloadTime: number = 0;
  totalSegmentsDownloadBytes: number = 0;
  maxSegmentDownloadTime: ?number = null;
  maxManifestDownloadTime: ?number = null;
  forwardBufferHealth: number;
  droppedFramesRatio: ?number = null;
  soundMode: SoundMode;
  tabMode: TabMode;
  playerJSLoadTime: ?number = null;
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
   * Gets the player bundle js load duration time
   * @returns {number} - The player js load duration time
   * @memberof KavaModel
   * @instance
   */
  getPlayerJSLoadTime(): ?number {
    if (this.playerJSLoadTime) {
      return Math.round(this.playerJSLoadTime * 1000) / 1000;
    } else {
      return null;
    }
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
   * Gets the target buffer
   * @returns {number} - The target buffer in seconds.
   * @memberof KavaModel
   * @instance
   */
  getTargetBuffer(): number {
    return this.targetBuffer;
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
   * Gets the average bandwidth since last report.
   * @returns {number} - The bandwidth in kbps
   * @memberof KavaModel
   * @instance
   */
  getBandwidth(): number {
    return this.totalSegmentsDownloadTime > 0 ? Math.round((this.totalSegmentsDownloadBytes * 8) / this.totalSegmentsDownloadTime) / 1000 : 0;
  }

  /**
   * Returns the longest manifest download time in seconds
   * @returns {number} - manifest max download time in seconds
   * @memberof KavaModel
   * @instance
   */
  getMaxManifestDownloadTime(): ?number {
    return this.maxManifestDownloadTime;
  }

  /**
   * Returns the longest segment download time in seconds
   * @returns {number} - segment max download time in seconds
   * @memberof KavaModel
   * @instance
   */
  getSegmentDownloadTime(): ?number {
    return this.maxSegmentDownloadTime;
  }

  /**
   * Gets the forward buffer health ratio.
   * @returns {number} - the ratio between the available buffer and the target buffer
   * @memberof KavaModel
   * @instance
   */
  getForwardBufferHealth(): number {
    return this.forwardBufferHealth;
  }
  /**
   * Gets the dropped frames ratio since last view event.
   * @returns {number} - dropped frames ratio since last view event
   * @memberof KavaModel
   * @instance
   */
  getDroppedFramesRatio(): ?number {
    return this.droppedFramesRatio;
  }

  /**
   * Gets the sound mode of the player.
   * @returns {SoundMode} the state of the sound (muted ot not)
   * @memberof KavaModel
   * @instance
   */
  getSoundMode(): SoundMode {
    return this.soundMode;
  }

  /**
   * Gets the Tab mode of the browser.
   * @returns {TabMode} the state of the tab (focused or not)
   * @memberof KavaModel
   * @instance
   */
  getTabMode(): TabMode {
    return this.tabMode;
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

const SoundMode = {
  SOUND_OFF: 1,
  SOUND_ON: 2
};

const TabMode = {
  TAB_NOT_FOCUSED: 1,
  TAB_FOCUSED: 2
};

export {KavaModel, SoundMode, TabMode};
