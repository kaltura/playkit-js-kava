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
  errorPosition: $Values<typeof ErrorPosition>;
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
  targetBuffer: number;
  totalSegmentsDownloadTime: number = 0;
  totalSegmentsDownloadBytes: number = 0;
  maxSegmentDownloadTime: number = 0;
  maxManifestDownloadTime: number = 0;
  forwardBufferHealth: number;
  droppedFramesRatio: ?number = null;
  soundMode: $Values<typeof SoundMode>;
  viewabilityMode: $Values<typeof ViewabilityMode>;
  tabMode: $Values<typeof TabMode>;
  screenMode: $Values<typeof ScreenMode> = ScreenMode.NOT_IN_FULLSCREEN;
  maxNetworkConnectionOverhead: number = 0;
  flavorParamsId: number = NaN;
  networkConnectionType: string;
  playerJSLoadTime: ?number = null;
  getActualBitrate: Function;
  getPlaybackSpeed: Function;
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
  getUserId: Function;
  getCanPlayTime: Function;
  getPersistentSessionId: Function;

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
  getMaxManifestDownloadTime(): number {
    return this.maxManifestDownloadTime;
  }

  /**
   * Returns the longest segment download time in seconds
   * @returns {number} - segment max download time in seconds
   * @memberof KavaModel
   * @instance
   */
  getSegmentDownloadTime(): number {
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
  getSoundMode(): $Values<typeof SoundMode> {
    return this.soundMode;
  }

  /**
   * Gets the viewability mode of the player.
   * @returns {ViewabilityMode} the state of the view (in-view ot not)
   * @memberof KavaModel
   * @instance
   */
  getViewabilityMode(): $Values<typeof ViewabilityMode> {
    return this.viewabilityMode;
  }

  /**
   * Gets the screen mode of the browser player.
   * @returns {number} the state of the full screen if is on or not.
   * @memberof KavaModel
   * @instance
   */
  getScreenMode(): $Values<typeof ScreenMode> {
    return this.screenMode;
  }

  /**
   * Gets the Tab mode of the browser.
   * @returns {TabMode} the state of the tab (focused or not)
   * @memberof KavaModel
   * @instance
   */
  getTabMode(): $Values<typeof TabMode> {
    return this.tabMode;
  }

  /**
   * Gets the effectiveType read-only property of the NetworkInformation interface (from navigator)
   * @returns {string} the effective type of the connection meaning one of 'slow-2g', '2g', '3g', or '4g'
   * @memberof KavaModel
   * @instance
   */
  getNetworkConnectionType(): string {
    return this.networkConnectionType;
  }

  /**
   * Gets the max dns+ssl+tcp resolving time over all video segments
   * @returns {number} max dns+ssl+tcp in seconds
   * @memberof KavaModel
   * @instance
   */
  getNetworkConnectionOverhead(): number {
    // convert ms to seconds in 0.xxx format
    return Math.round(this.maxNetworkConnectionOverhead) / 1000;
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
   * Gets the flavor id from ID3 tag in the packager
   * @returns {number} - The flavor id.
   * @memberof KavaModel
   * @instance
   */
  getFlavorParamsId(): number {
    return this.flavorParamsId;
  }

  /**
   * Gets the error additional data.
   * @returns {string} - The stringifyed error data.
   * @memberof KavaModel
   * @instance
   */
  getErrorDetails(): string {
    let retVal: string = '';
    if (this.errorDetails) {
      try {
        retVal = JSON.stringify(this.errorDetails);
      } catch (e) {
        // do nothing
      }
    }
    return retVal;
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
   * Gets the error position (start or mid playing)
   * @returns {number} - The error position - 1 for pre playing, 2 for mid stream error
   * @memberof KavaModel
   * @instance
   */
  getErrorPosition(): $Values<typeof ErrorPosition> {
    return this.errorPosition;
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

const ViewabilityMode = {
  NOT_IN_VIEW: 1,
  IN_VIEW: 2
};

const TabMode = {
  TAB_NOT_FOCUSED: 1,
  TAB_FOCUSED: 2
};

const ScreenMode = {
  NOT_IN_FULLSCREEN: 1,
  FULLSCREEN: 2
};

const ErrorPosition = {
  PRE_PLAY: 3,
  PRE_PLAYING: 1,
  MID_STREAM: 2
};

export {KavaModel, SoundMode, TabMode, ErrorPosition, ScreenMode, ViewabilityMode};
