import { getEventModel } from './kava-event-model';
import { KavaEvent } from './types';
import { EventBucketName } from './enums/event-bucket-name';
import { getApplicationEventsModel } from './application-events-model';

/**
 * The KAVA model that stores data.
 * @class KavaModel
 * @private
 * @param {?Object} - Initial model.
 */
class KavaModel {
  private sessionStartTime!: number;
  private eventIndex!: number;
  private errorPosition!: ErrorPosition;
  private playTimeSum!: number;
  private bufferTime!: number;
  private bufferTimeSum!: number;
  private language!: string;
  private caption!: string;
  private errorCode!: number;
  private errorDetails: any;
  private joinTime!: number;
  private canPlayTime!: number;
  private targetPosition!: number;
  private targetBuffer!: number;
  private registeredPlugins: string = '';
  public totalSegmentsDownloadTime: number = 0;
  public totalSegmentsDownloadBytes: number = 0;
  public maxSegmentDownloadTime: number = 0;
  public maxManifestDownloadTime: number = 0;
  private forwardBufferHealth!: number;
  private droppedFramesRatio?: number | null = null;
  private soundMode!: SoundMode;
  private viewabilityMode!: ViewabilityMode;
  private tabMode!: TabMode;
  private screenMode: ScreenMode = ScreenMode.NOT_IN_FULLSCREEN;
  public maxNetworkConnectionOverhead: number = 0;
  private flavorParamsId: number = NaN;
  private networkConnectionType!: string;
  public playerJSLoadTime?: number | null = null;
  private shareNetworkName: string = '';
  private reportType: number = NaN;
  private playbackMode: number = NaN;
  private sourceEntryId: string | null = null;

  public getActualBitrate!: () => any;
  public getPlaybackSpeed!: () => any;
  public getAverageBitrate!: () => any;
  public getPartnerId!: () => any;
  public getEntryId!: () => any;
  public getPlaylistId!: () => any;
  public getSessionId!: () => any;
  public getClientVer!: () => any;
  public getClientTag!: () => any;
  public getKS!: () => any;
  public getVirtualEventId!: () => any;
  public getUIConfId!: () => any;
  public getReferrer!: () => any;
  public getCustomVar1!: () => any;
  public getCustomVar2!: () => any;
  public getCustomVar3!: () => any;
  public getPosition!: () => any;
  public getDeliveryType!: () => any;
  public getPlaybackType!: () => any;
  public getPlaybackContext!: () => any;
  public getApplicationVersion!: () => any;
  public getApplication!: () => any;
  public getKalturaApplicationVersion!: () => any;
  public getKalturaApplication!: () => any;
  public getUserId!: () => any;
  public getPersistentSessionId!: () => any;

  constructor(model?: object) {
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
  public getPlayTimeSum(): number {
    return this.playTimeSum;
  }

  public getCanPlayTime(): number {
    return this.canPlayTime;
  }

  /**
   * Gets the buffer time.
   * @returns {number} - The buffer time.
   * @memberof KavaModel
   * @instance
   */
  public getBufferTime(): number {
    return this.bufferTime;
  }

  /**
   * Gets the total buffer time.
   * @returns {number} - The total buffer time.
   * @memberof KavaModel
   * @instance
   */
  public getBufferTimeSum(): number {
    return this.bufferTimeSum;
  }

  /**
   * Gets the player bundle js load duration time
   * @returns {number} - The player js load duration time
   * @memberof KavaModel
   * @instance
   */
  public getPlayerJSLoadTime(): number | null {
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
  public getJoinTime(): number {
    return this.joinTime;
  }

  /**
   * Gets a target position
   * @returns {number} - The target position.
   * @memberof KavaModel
   * @instance
   */
  public getTargetPosition(): number {
    return this.targetPosition;
  }

  /**
   * Gets the target buffer
   * @returns {number} - The target buffer in seconds.
   * @memberof KavaModel
   * @instance
   */
  public getTargetBuffer(): number {
    return this.targetBuffer;
  }

  /**
   * Gets registered plugins list
   * @returns {string} - The current list of loaded plugins
   * @memberof KavaModel
   * @instance
   */
  public getRegisteredPlugins(): string {
    return this.registeredPlugins;
  }

  /**
   * Gets an audio language.
   * @returns {string} - The audio language.
   * @memberof KavaModel
   * @instance
   */
  public getLanguage(): string {
    return this.language;
  }

  /**
   * Gets a caption language.
   * @returns {string} - The caption language.
   * @memberof KavaModel
   * @instance
   */
  public getCaption(): string {
    return this.caption;
  }

  /**
   * Gets the average bandwidth since last report.
   * @returns {number} - The bandwidth in kbps
   * @memberof KavaModel
   * @instance
   */
  public getBandwidth(): number {
    return this.totalSegmentsDownloadTime > 0 ? Math.round((this.totalSegmentsDownloadBytes * 8) / this.totalSegmentsDownloadTime) / 1000 : 0;
  }

  /**
   * Returns the longest manifest download time in seconds
   * @returns {number} - manifest max download time in seconds
   * @memberof KavaModel
   * @instance
   */
  public getMaxManifestDownloadTime(): number {
    return this.maxManifestDownloadTime;
  }

  /**
   * Returns the longest segment download time in seconds
   * @returns {number} - segment max download time in seconds
   * @memberof KavaModel
   * @instance
   */
  public getSegmentDownloadTime(): number {
    return this.maxSegmentDownloadTime;
  }

  /**
   * Gets the forward buffer health ratio.
   * @returns {number} - the ratio between the available buffer and the target buffer
   * @memberof KavaModel
   * @instance
   */
  public getForwardBufferHealth(): number {
    return this.forwardBufferHealth;
  }
  /**
   * Gets the dropped frames ratio since last view event.
   * @returns {number} - dropped frames ratio since last view event
   * @memberof KavaModel
   * @instance
   */
  public getDroppedFramesRatio(): number | null | undefined {
    return this.droppedFramesRatio;
  }

  /**
   * Gets the sound mode of the player.
   * @returns {SoundMode} the state of the sound (muted ot not)
   * @memberof KavaModel
   * @instance
   */
  public getSoundMode(): SoundMode {
    return this.soundMode;
  }

  /**
   * Gets the viewability mode of the player.
   * @returns {ViewabilityMode} the state of the view (in-view ot not)
   * @memberof KavaModel
   * @instance
   */
  public getViewabilityMode(): ViewabilityMode {
    return this.viewabilityMode;
  }

  /**
   * Gets the screen mode of the browser player.
   * @returns {number} the state of the full screen if is on or not.
   * @memberof KavaModel
   * @instance
   */
  public getScreenMode(): ScreenMode {
    return this.screenMode;
  }

  /**
   * Gets the Tab mode of the browser.
   * @returns {TabMode} the state of the tab (focused or not)
   * @memberof KavaModel
   * @instance
   */
  public getTabMode(): TabMode {
    return this.tabMode;
  }

  /**
   * Gets the effectiveType read-only property of the NetworkInformation interface (from navigator)
   * @returns {string} the effective type of the connection meaning one of 'slow-2g', '2g', '3g', or '4g'
   * @memberof KavaModel
   * @instance
   */
  public getNetworkConnectionType(): string {
    return this.networkConnectionType;
  }

  /**
   * Gets the max dns+ssl+tcp resolving time over all video segments
   * @returns {number} max dns+ssl+tcp in seconds
   * @memberof KavaModel
   * @instance
   */
  public getNetworkConnectionOverhead(): number {
    // convert ms to seconds in 0.xxx format
    return Math.round(this.maxNetworkConnectionOverhead) / 1000;
  }

  /**
   * Gets the error code.
   * @returns {number} - The error code.
   * @memberof KavaModel
   * @instance
   */
  public getErrorCode(): number {
    return this.errorCode;
  }

  /**
   * Gets the flavor id from ID3 tag in the packager
   * @returns {number} - The flavor id.
   * @memberof KavaModel
   * @instance
   */
  public getFlavorParamsId(): number {
    return this.flavorParamsId;
  }

  /**
   * Gets the error additional data.
   * @returns {string} - The stringifyed error data.
   * @memberof KavaModel
   * @instance
   */
  public getErrorDetails(): string {
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
  public getEventIndex(): number {
    return this.eventIndex;
  }

  /**
   * Gets the error position (start or mid playing)
   * @returns {number} - The error position - 1 for pre playing, 2 for mid stream error
   * @memberof KavaModel
   * @instance
   */
  public getErrorPosition(): ErrorPosition {
    return this.errorPosition;
  }

  /**
   * Gets the session start time.
   * @returns {number} - The session start time.
   * @memberof KavaModel
   * @instance
   */
  public getSessionStartTime(): number {
    return this.sessionStartTime;
  }

  /**
   * Gets the share network name.
   * @returns {number} - The session start time.
   * @memberof KavaModel
   * @instance
   */
  public getShareNetworkName(): string {
    return this.shareNetworkName;
  }

  public getReportType(): number {
    return this.reportType;
  }

  public getPlaybackMode(): number {
    return this.playbackMode;
  }

  /**
   * Gets the source entry id - the entry id that the current part of a simulive entry was generated from.
   * @returns {string} - Source entry id.
   * @memberof KavaModel
   * @instance
   */
  public getSourceEntryId(): string | null {
    return this.sourceEntryId;
  }

  /**
   * Updates the model.
   * @param {Object} obj - A partial or full updated model.
   * @returns {void}
   * @memberof KavaModel
   * @instance
   */
  public updateModel(obj: object): void {
    Object.assign(this, obj);
  }

  /**
   * Gets the model for a certain event.
   * @param {KavaEvent} eventObj - The event object.
   * @param {EventBucketName} eventBucketName - The dashboard name in kava dashboards.
   * @param {any} eventPayload - The original player event payload.
   * @returns {Object} - The event model.
   * @memberof KavaModel
   * @instance
   */
  public getModel(eventObj: KavaEvent, eventBucketName: EventBucketName = EventBucketName.PlayerEvents, eventPayload?: any): any {
    switch (eventBucketName) {
      case EventBucketName.PlayerEvents:
        return getEventModel(eventObj, this);
      case EventBucketName.ApplicationEvents:
        return getApplicationEventsModel(eventObj, this, eventPayload);
    }
  }
}

enum SoundMode {
  SOUND_OFF = 1,
  SOUND_ON = 2
}

enum ViewabilityMode {
  NOT_IN_VIEW = 1,
  IN_VIEW = 2
}

enum TabMode {
  TAB_NOT_FOCUSED = 1,
  TAB_FOCUSED = 2
}

enum ScreenMode {
  NOT_IN_FULLSCREEN = 1,
  FULLSCREEN = 2
}

enum ErrorPosition {
  PRE_PLAY = 3,
  PRE_PLAYING = 1,
  MID_STREAM = 2
}

export { KavaModel, SoundMode, TabMode, ErrorPosition, ScreenMode, ViewabilityMode };
