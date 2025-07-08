import {BasePlugin, core, KalturaPlayer, LocalStorageManager} from '@playkit-js/kaltura-player-js';
import { FakeEvent, VideoTrack } from '@playkit-js/playkit-js';
import { OVPAnalyticsService } from '@playkit-js/playkit-js-providers/analytics-service';
import { KavaEventModel, KavaEventType } from './kava-event-model';
import { KavaRateHandler } from './kava-rate-handler';
import { KavaTimer } from './kava-timer';
import { ErrorPosition, KavaModel, ScreenMode, SoundMode, TabMode, ViewabilityMode } from './kava-model';
import { HttpMethodType } from './enums/http-method-type';
import { KalturaApplication } from './enums/kaltura-application';
import { KavaConfigObject, KavaEvent } from './types';
import { DownloadEvent, InfoEvent, ModerationEvent, RelatedEvent, ShareEvent } from './temp-imported-plugins-event-names-temp';
import { PluginsEvents, PlaykitUIEvents } from './applications-events';
import { EventBucketName } from './enums/event-bucket-name';
import { ApplicationEventsModel, getApplicationEventsModel } from './application-events-model';
import { Application } from './enums/application';
import { PlayerSkin } from './enums/player-skin';

const { Error: PKError, Utils } = core;
const DIVIDER: number = 1024;
const TEXT_TYPE: string = 'TEXT';
const FAILED_LIVE_EVENT_KEY_PREFIX = "FailedLiveEvent_";
const FAILED_LIVE_COUNTER_KEY_PREFIX = "FailedLiveEventCounter_";
/**
 * Kaltura Advanced Analytics plugin.
 * @class Kava
 * @param {string} name - The plugin name.
 * @param {Player} player - The player instance.
 * @param {KavaConfigObject} config - The plugin config.
 */
class Kava extends BasePlugin {
  private _model: KavaModel;
  private _timer: KavaTimer;
  private _rateHandler: KavaRateHandler;
  private _viewEventEnabled: boolean;
  private _firstPlayRequestTime!: number;
  private _bufferStartTime!: number;
  private _previousCurrentTime!: number;
  private _isFirstPlay!: boolean;
  private _isFirstPlaying!: boolean;
  private _isEnded!: boolean;
  private _isPaused!: boolean;
  private _isBuffering!: boolean;
  private _timePercentEvent!: { [time: string]: boolean };
  private _isPlaying!: boolean;
  private _loadStartTime!: number;
  private _lastDroppedFrames: number = 0;
  private _lastTotalFrames: number = 0;
  private _performanceObserver!: PerformanceObserver;
  private _performanceEntries: PerformanceEntry[] = [];
  private _pendingFragLoadedUrls: string[] = [];
  private _fragLoadedFiredOnce: boolean = false;
  private _canPlayOccured: boolean = false;
  private _isManualPreload: boolean = false;
  private _lastViewEventPlayTime: number = -1;

  /**
   * Default config of the plugin.
   * @type {Object}
   * @static
   * @memberof Kava
   */
  public static defaultConfig: any = {
    serviceUrl: `${Utils.Http.protocol}//analytics.kaltura.com/api_v3/index.php`,
    requestMethod: HttpMethodType.POST,
    viewEventCountdown: 10,
    resetSessionCountdown: 30,
    dvrThreshold: 120,
    playbackContext: '',
    application: '',
    kalturaApplicationVersion: '',
    kalturaApplication: 'PLAYER',
    hostingKalturaApplication: '',
    hostingKalturaApplicationVersion: ''
  };

  /**
   * @static
   * @return {boolean} - Whether the plugin is valid in the current environment.
   * @memberof Kava
   */
  public static isValid(): boolean {
    return true;
  }

  constructor(name: string, player: KalturaPlayer, config: KavaConfigObject) {
    super(name, player, config);
    this._rateHandler = new KavaRateHandler();
    this._model = new KavaModel();
    this._setModelDelegates();
    this._timer = new KavaTimer({
      resetCounter: this.config.resetSessionCountdown,
      eventCounter: this.config.viewEventCountdown
    });
    this._viewEventEnabled = true;
    this._resetFlags();
    this._addBindings();
    this._model.updateModel({
      eventIndex: 1,
      bufferTime: 0.0,
      bufferTimeSum: 0.0,
      playTimeSum: 0.0
    });
    // check the Resource Timing API is supported in the browser and we have a uiConfId
    if (performance && this.config.uiConfId) {
      const entry = performance.getEntriesByType('resource').find((entry) => entry.name.match('embedPlaykitJs.*' + this.config.uiConfId));
      if (entry) {
        this._model.updateModel({ playerJSLoadTime: entry.duration });
      }
    }
  }

  private _updateSoundModeInModel(): void {
    this._model.updateModel({
      soundMode: this.player.muted || this.player.volume === 0 ? SoundMode.SOUND_OFF : SoundMode.SOUND_ON
    });
  }

  private _updateViewabilityModeInModel(isVisible: boolean): void {
    this._model.updateModel({
      viewabilityMode: isVisible || this.player.isInPictureInPicture() ? ViewabilityMode.IN_VIEW : ViewabilityMode.NOT_IN_VIEW
    });
  }

  private _handleNewPerformanceEntries(list: PerformanceObserverEntryList): void {
    const perfEntries = list.getEntries();
    for (let i = 0; i < perfEntries.length; i++) {
      this._performanceEntries.push(perfEntries[i]);
    }
    while (this._pendingFragLoadedUrls.length) {
      // handle frag loaded events which haven't been added to the entry list yet
      this._handleFragPerformanceObserver(this._pendingFragLoadedUrls.pop()!);
    }
  }

  /**
   * Destroys the plugin.
   * @return {void}
   * @memberof Kava
   * @instance
   */
  public destroy(): void {
    this.eventManager.destroy();
    this._reset();
  }

  private _reset(): void {
    this._timer.destroy();
    this._rateHandler.destroy();
    if (this._performanceObserver) {
      this._performanceObserver.disconnect();
    }
    this._performanceEntries = [];
    this._pendingFragLoadedUrls = [];
  }

  /**
   * Reset the plugin.
   * @return {void}
   * @memberof Kava
   * @instance
   */
  public reset(): void {
    this.eventManager.removeAll();
    this._resetFlags();
    this._addBindings();
    this._model.updateModel({
      eventIndex: 1,
      bufferTime: 0.0,
      bufferTimeSum: 0.0,
      playTimeSum: 0.0,
      sessionStartTime: null
    });
    this._reset();
  }

  /**
   * loadMedia of the plugin.
   * @return {void}
   * @memberof Kava
   * @instance
   */
  public loadMedia(): void {
    if (window.PerformanceObserver) {
      this._performanceObserver = new window.PerformanceObserver(this._handleNewPerformanceEntries.bind(this));
      this._performanceObserver.observe({ entryTypes: ['resource'] });
    }
  }

  /**
   * Gets the model object for a certain event.
   * @param {string} event - Event name.
   * @returns {Object} - Model object.
   * @instance
   * @memberof Kava
   * @example
   * const kava = player.plugins.kava;
   * const viewModel = kava.getEventModel(kava.EventType.VIEW);
   * kava.sendAnalytics(viewModel);
   */
  public getEventModel(event: string): any {
    if (event) {
      return this._model.getModel(KavaEventModel[event]);
    }
  }

  /**
   * @returns {KavaEventType} - The kava events list.
   * @instance
   * @memberof Kava
   */
  public get EventType(): { [event: string]: string } {
    return Utils.Object.copyDeep(KavaEventType);
  }

  /**
   * Sends KAVA analytics event to analytics service.
   * @param {Object} model - Event model.
   * @returns {Promise} - Promise to indicate request succeed or failed.
   * @instance
   * @memberof Kava
   * @example
   * player.plugins.kava.sendAnalytics({...})
   * .then(() => {
   *   console.log('kava analytics sent successfully');
   * })
   * .catch(e => {
   *   console.log('kava analytics send failed', e);
   * });
   */
  public sendAnalytics(model: any): Promise<void> {
    return new Promise((resolve, reject) => {
      OVPAnalyticsService.trackEvent(this.config.serviceUrl, model, this.config.requestMethod)
        .doHttpRequest()
        .then(
          (response) => {
            this._handleServerResponseSuccess(response, model);
            resolve();
          },
          (err) => {
            this._handleServerResponseFailed(err, model);
            reject(err);
          }
        );
      this._model.updateModel({ eventIndex: this._model.getEventIndex() + 1 });
    });
  }

  private _resetFlags(): void {
    this._previousCurrentTime = 0;
    this._lastViewEventPlayTime = -1;
    this._isPlaying = false;
    this._isFirstPlay = true;
    this._isFirstPlaying = true;
    this._isEnded = false;
    this._isPaused = false;
    this._isBuffering = false;
    this._timePercentEvent = {
      PLAY_REACHED_25_PERCENT: false,
      PLAY_REACHED_50_PERCENT: false,
      PLAY_REACHED_75_PERCENT: false,
      PLAY_REACHED_100_PERCENT: false
    };
    this._canPlayOccured = false;
    this._isManualPreload = false;
  }

  private _resetSession(): void {
    this.logger.debug('Reset KAVA session');
    this._rateHandler.reset();
    this._model.updateModel({
      eventIndex: 1,
      bufferTimeSum: 0.0,
      playTimeSum: 0.0
    });
  }

  private _sendAnalytics(eventObj: KavaEvent, eventBucketName: EventBucketName = EventBucketName.PlayerEvents, eventPayload?: any): void {
    if (!this._validate()) {
      return;
    }
    if (this._isBuffering) {
      this._updateBufferModel();
      this._bufferStartTime = Date.now();
    }
    const model = this._model.getModel(eventObj, eventBucketName, eventPayload);
    if (typeof this.config.tamperAnalyticsHandler === 'function') {
      const sendRequest = this.config.tamperAnalyticsHandler(model);
      if (!sendRequest) {
        this.logger.debug('Cancel KAVA request', model);
        return;
      }
    }
    if (this.shouldLogLiveAnalyticsFailures()) {
      model.numOfLiveAnalyticsFailures = LocalStorageManager.getItem(`${model.entryId}`) || 0;
    }
    this.logger.debug(`Sending KAVA event ${model.eventType}:${eventObj.type}`);
    this.sendAnalytics(model).catch(() => {});
  }

  private shouldLogLiveAnalyticsFailures(): boolean {
    return this.config?.logLiveAnalyticsFailures && this.player?.isLive();
  }

  private _handleServerResponseSuccess(response: any, model: any): void {
    this.logger.debug('KAVA event sent', model);
    this._updateSessionStartTimeModel(response);
  }

  private _handleServerResponseFailed(err: any, model: any): void {
    if (this.shouldLogLiveAnalyticsFailures()) {
      this.loggedFailedLiveAnalyticsEventsToLocalStorage(err, model);
    }
    this.logger.warn('Failed to send KAVA event', model, err);
  }

  /**
   * Logs failed events to browser's local storage
   * @param {any} error - The error that occurred
   * @param {KavaModel} model - The Kava model
   * @returns {void}
   */
  private loggedFailedLiveAnalyticsEventsToLocalStorage(error: any, model: KavaModel): void {
    // Generate current datetime in a storage-friendly format
    const datetime = new Date().toISOString();

    // Get event type and entryId from model
    const eventType = model['eventType'] || 'unknown';
    const entryId = model['entryId'] || 'unknown';
    const sessionId = model['sessionId'] || 'unknown';
    const partnerId = model['partnerId'] || 'unknown';
    const position = model['position'] || 0;
    const errorDetails = model['errorDetails'] || null;
    const numOfLoggedFailedEvents = this.config?.numOfLoggedFailedEvents || 100;

    // Construct storage key
    const storageKey = `${FAILED_LIVE_EVENT_KEY_PREFIX}${datetime}-${eventType}-${entryId}`;

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
      LocalStorageManager.setItem(storageKey, JSON.stringify(dataToStore));
      this.deleteOldestFailedAnalyticsStorageItem(numOfLoggedFailedEvents, FAILED_LIVE_EVENT_KEY_PREFIX);
      //delete the oldest n stored item.
    } catch (e) {
      this.logger.warn('Failed to store failed event in localStorage:', e);
    }
  }
  private getFailedCounterKey(entryId: string): string {
    return `${FAILED_LIVE_COUNTER_KEY_PREFIX}-${entryId}`;
  }

  private extractBetween(str, prefix, suffix) {
    const start = str.indexOf(prefix);
    if (start === -1) return null;

    const end = str.indexOf(suffix, start + prefix.length);
    if (end === -1) return null;

    return str.substring(start + prefix.length, end);
  }

  private deleteOldestFailedAnalyticsStorageItem(tailLength: number, eventPrefix: string): void {
    const dateTimeSuffix = 'Z-';
    const keys = Object.keys(LocalStorageManager.getStorageObject()).filter((key) => key.includes(eventPrefix));

    if (keys.length > tailLength) {
      // Sort keys by creation time (assuming they are in the format 'YYYY-MM-DDTHH:mm:ss.sssZ')
      //"@playkit-js/kaltura-player-js_FailedEvents_2025-07-06T13-56-38-172Z-99-0_lb78dwcy"
      const mapKeys = keys.map((key) => this.extractBetween(key, eventPrefix, dateTimeSuffix));
      mapKeys.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
      // Remove the oldest key
      const oldestItemKey = keys.find((key) => key.includes(mapKeys[0]));
      if (oldestItemKey) {
        LocalStorageManager.removeItem(oldestItemKey);
      }
    }
  }


  private _addBindings(): void {
    this.eventManager.listen(this._timer, KavaTimer.Event.TICK, () => this._rateHandler.countCurrent());
    this.eventManager.listen(this._timer, KavaTimer.Event.REPORT, () => this._onReport());
    this.eventManager.listen(this._timer, KavaTimer.Event.RESET, () => this._resetSession());
    this.eventManager.listen(this.player, this.player.Event.Core.SOURCE_SELECTED, () => this._onSourceSelected());
    this.eventManager.listen(this.player, this.player.Event.Core.ERROR, (event) => this._onError(event));
    this.eventManager.listen(this.player, this.player.Event.Core.FIRST_PLAY, () => this._onFirstPlay());
    this.eventManager.listen(this.player, this.player.Event.Core.FRAG_LOADED, (event) => this._onFragLoaded(event));
    this.eventManager.listen(this.player, this.player.Event.Core.MANIFEST_LOADED, (event) => this._onManifestLoaded(event));
    this.eventManager.listen(this.player, this.player.Event.Core.TIMED_METADATA, (event) => this._onTimedMetadataLoaded(event));
    this.eventManager.listen(this.player, this.player.Event.Core.TRACKS_CHANGED, () => this._setInitialTracks());
    this.eventManager.listen(this.player, this.player.Event.Core.PLAYING, () => this._onPlaying());
    this.eventManager.listen(this.player, this.player.Event.Core.FIRST_PLAYING, () => this._onFirstPlaying());
    this.eventManager.listen(this.player, this.player.Event.Core.SEEKING, () => this._onSeeking());
    this.eventManager.listen(this.player, this.player.Event.Core.PAUSE, () => this._onPause());
    this.eventManager.listen(this.player, this.player.Event.Core.ENDED, () => this._onEnded());
    this.eventManager.listen(this.player, this.player.Event.Core.VIDEO_TRACK_CHANGED, (event) => this._onVideoTrackChanged(event));
    this.eventManager.listen(this.player, this.player.Event.Core.AUDIO_TRACK_CHANGED, (event) => this._onAudioTrackChanged(event));
    this.eventManager.listen(this.player, this.player.Event.Core.TEXT_TRACK_CHANGED, (event) => this._onTextTrackChanged(event));
    this.eventManager.listen(this.player, this.player.Event.Core.PLAYER_STATE_CHANGED, (event) => this._onPlayerStateChanged(event));
    this.eventManager.listen(this.player, this.player.Event.Core.RATE_CHANGE, () => this._onPlaybackRateChanged());
    this.eventManager.listen(this.player, this.player.Event.Core.CAN_PLAY, () => this._onCanPlay());
    this.eventManager.listen(this.player, this.player.Event.Core.LOAD_START, () => this._onLoadStart());
    this.eventManager.listen(this.player, this.player.Event.Core.VOLUME_CHANGE, () => this._updateSoundModeInModel());
    this.eventManager.listen(this.player, this.player.Event.VISIBILITY_CHANGE, (e) => this._updateViewabilityModeInModel(e.payload.visible));
    this.eventManager.listen(this.player, this.player.Event.Core.MUTE_CHANGE, () => this._updateSoundModeInModel());
    this.eventManager.listen(this.player, this.player.Event.Core.ENTER_FULLSCREEN, () => this._onFullScreenChanged(ScreenMode.FULLSCREEN));
    this.eventManager.listen(this.player, this.player.Event.Core.EXIT_FULLSCREEN, () => this._onFullScreenChanged(ScreenMode.NOT_IN_FULLSCREEN));
    this.eventManager.listen(this.player, RelatedEvent.RELATED_OPEN, () => this._onRelatedClicked());
    this.eventManager.listen(this.player, RelatedEvent.RELATED_SELECTED, () => this._onRelatedSelected());
    this.eventManager.listen(this.player, ShareEvent.SHARE_CLICKED, () => this._onShareClicked());
    this.eventManager.listen(this.player, ShareEvent.SHARE_NETWORK, (event) => this._onShareNetworkClicked(event));
    this.eventManager.listen(this.player, DownloadEvent.DOWNLOAD_ITEM_CLICKED, () => this._onDownloadItemClicked());
    this.eventManager.listen(this.player, InfoEvent.INFO_SCREEN_OPEN, () => this._onInfoScreenOpened());
    this.eventManager.listen(this.player, ModerationEvent.REPORT_CLICKED, () => this._onReportClicked());
    this.eventManager.listen(this.player, ModerationEvent.REPORT_SUBMITTED, (event) => this._onReportSubmitted(event));
    this._bindApplicationEvents();
    this._bindPlaykitUIEvents();
    this._initTabMode();
    this._initNetworkConnectionType();
  }

  private _bindPlaykitUIEvents(): void {
    Object.values(PlaykitUIEvents).forEach((event) => {
      this.eventManager.listen(this.player, event, (e: FakeEvent) => {
        if (e.type in ApplicationEventsModel) {
          if (this._isApplicationEventValid(e)) {
            this._sendAnalytics(ApplicationEventsModel[e.type], EventBucketName.ApplicationEvents, e.payload);
          }
        }
      });
    });
  }

  private _bindApplicationEvents(): void {
    Object.values(PluginsEvents).forEach((event) => {
      this.eventManager.listen(this.player, event, (e: FakeEvent) => {
        if (e.type in ApplicationEventsModel) {
          if (this._isApplicationEventValid(e)) {
            this._sendAnalytics(ApplicationEventsModel[e.type], EventBucketName.ApplicationEvents, e.payload);
          }
        }
      });
    });
  }

  private _onFirstPlaying(): void {
    this._isPlaying = true;
    if (!this._fragLoadedFiredOnce && this._performanceObserver) {
      this._performanceObserver.disconnect();
      this.logger.debug("This adapter / media doesn't fire fragLoaded - disconnect performance observer");
    }
  }

  private _onLoadStart(): void {
    this._loadStartTime = Date.now();
  }

  private _getRates(): Array<number> {
    const rates: number[] = [];
    const videoTracks: VideoTrack[] = this.player.getTracks(this.player.Track.VIDEO) as unknown as VideoTrack[];
    videoTracks.forEach((videoTrack) => rates.push(videoTrack.bandwidth / DIVIDER));
    return rates;
  }

  private _setInitialTracks(): void {
    const rates = this._getRates();
    const activeTracks = this.player.getActiveTracks();
    this._rateHandler.setRates(rates);
    if (activeTracks.video) {
      this._rateHandler.setCurrent(activeTracks.video.bandwidth / DIVIDER);
    }
    if (activeTracks.audio) {
      this._model.updateModel({ language: activeTracks.audio.language });
    }
    if (activeTracks.text) {
      this._model.updateModel({ caption: activeTracks.text.language });
    }
  }

  /**
   * gets the available buffer length
   * @returns {number} the remaining buffer length of the current played time range
   * @private
   */
  private _getAvailableBuffer(): number {
    let availableBuffer = NaN;
    if (this.player.stats) {
      availableBuffer = this.player.stats.availableBuffer;
    }
    return availableBuffer;
  }

  /**
   * calculates the forward buffer health ratio
   * @returns {number} the ratio between available buffer and the target buffer
   * @private
   */
  private _getForwardBufferHealth(): number {
    let forwardBufferHealth = NaN;
    const availableBuffer = this._getAvailableBuffer();
    const targetBuffer = this._getTargetBuffer();

    if (!isNaN(targetBuffer)) {
      // considering playback left to the target calculation
      forwardBufferHealth = Math.round((availableBuffer * 1000) / targetBuffer) / 1000;
    }

    return forwardBufferHealth;
  }

  /**
   * get the target buffer length from the player
   * @returns {number} the target buffer in seconds
   * @private
   */
  private _getTargetBuffer(): number {
    let targetBuffer = NaN;
    if (this.player.stats) {
      targetBuffer = this.player.stats.targetBuffer;
    }
    return targetBuffer;
  }

  /**
   * calculates the dropped frames ratio since last call
   * @returns {number} the ratio between dropped frames and the total frames
   * @private
   */
  private _getDroppedFramesRatio(): number {
    let droppedFrames = -1;
    const droppedAndDecoded: [number, number] | null = this._getDroppedAndDecodedFrames();
    if (droppedAndDecoded) {
      const lastDroppedFrames = droppedAndDecoded[0];
      const lastTotalFrames = droppedAndDecoded[1];
      const droppedFramesDelta = lastDroppedFrames - this._lastDroppedFrames;
      const totalFramesDelta = lastTotalFrames - this._lastTotalFrames;
      droppedFrames = totalFramesDelta ? Math.round((droppedFramesDelta / totalFramesDelta) * 1000) / 1000 : 0;

      this._lastTotalFrames = lastTotalFrames;
      this._lastDroppedFrames = lastDroppedFrames;
    }
    return droppedFrames;
  }

  /**
   * returns dropped and total frames from the VideoPlaybackQuality Interface of the browser (if supported)
   * @returns {number} {number} the number of video frames dropped and total video frames (created and dropped)
   * since the creation of the associated HTMLVideoElement
   * @private
   */
  private _getDroppedAndDecodedFrames(): [number, number] | null {
    if (typeof this.player.getVideoElement()!.getVideoPlaybackQuality === 'function') {
      const videoPlaybackQuality = this.player.getVideoElement()!.getVideoPlaybackQuality();
      return [videoPlaybackQuality.droppedVideoFrames, videoPlaybackQuality.totalVideoFrames];
    } else if (
      // @ts-expect-error - error TS2532: Object is possibly 'undefined'
      typeof this.player.getVideoElement().webkitDroppedFrameCount === 'number' &&
      // @ts-expect-error - error TS2532: Object is possibly 'undefined'
      typeof this.player.getVideoElement().webkitDecodedFrameCount === 'number'
    ) {
      // @ts-expect-error - error TS2532: Object is possibly 'undefined'
      return [this.player.getVideoElement().webkitDroppedFrameCount, this.player.getVideoElement().webkitDecodedFrameCount];
    } else {
      return null;
    }
  }

  private _onReport(): void {
    if (this._viewEventEnabled) {
      this._updatePlayTimeSumModel();
      this._model.updateModel({
        forwardBufferHealth: this._getForwardBufferHealth(),
        targetBuffer: this._getTargetBuffer(),
        droppedFramesRatio: this._getDroppedFramesRatio()
      });
      if (this._lastViewEventPlayTime !== this._model.getPlayTimeSum()) {
        this._lastViewEventPlayTime = this._model.getPlayTimeSum();
        this._sendAnalytics(KavaEventModel.VIEW);
      } else {
        this.logger.warn(`VIEW event blocked because view event with same time already sent: ${this._lastViewEventPlayTime}`);
      }
    } else {
      this.logger.warn('VIEW event blocked because server response of viewEventsEnabled=false');
    }
    this._model.updateModel({
      totalSegmentsDownloadTime: 0,
      totalSegmentsDownloadBytes: 0,
      maxManifestDownloadTime: 0,
      maxSegmentDownloadTime: 0,
      maxNetworkConnectionOverhead: 0,
      bufferTime: 0
    });
  }

  private _updateNetworkConnectionTypeinModel(navConnection: any): void {
    this._model.updateModel({
      networkConnectionType: navConnection.effectiveType
    });
  }

  private _initNetworkConnectionType(): void {
    // @ts-expect-error - Property 'webkitConnection' does not exist on type 'Navigator'
    const navConnection = window.navigator.connection || window.navigator.mozConnection || window.navigator.webkitConnection;

    if (navConnection) {
      this.eventManager.listen(navConnection, 'change', () => this._updateNetworkConnectionTypeinModel(navConnection));
      this._updateNetworkConnectionTypeinModel(navConnection);
    }
  }

  private _onPlaying(): void {
    if (this._isFirstPlaying) {
      this._updateSoundModeInModel();
      this._updateViewabilityModeInModel(this.player.isVisible);
      if (!this.player.isUntimedImg()) this._timer.start();
      this._isFirstPlaying = false;
      const playRequestStartTime =
        this.player.config.playback.preload === 'auto' || this._isManualPreload ? this._firstPlayRequestTime : this._loadStartTime;
      this._model.updateModel({
        joinTime: Kava._getTimeDifferenceInSeconds(playRequestStartTime)
      });
      this._sendAnalytics(KavaEventModel.PLAY);
      this._onReport();
    } else if (this._isEnded) {
      this._timer.start();
      this._isEnded = false;
      this._sendAnalytics(KavaEventModel.REPLAY);
    } else if (this._isPaused) {
      this._timer.resume();
      this._isPaused = false;
      this._sendAnalytics(KavaEventModel.RESUME);
    }
  }

  private _onCanPlay(): void {
    this._canPlayOccured = true;
    this._model.updateModel({
      canPlayTime: Kava._getTimeDifferenceInSeconds(this._loadStartTime)
    });
  }

  private _onFirstPlay(): void {
    if (this._canPlayOccured) {
      this._isManualPreload = true;
    }
    this._isFirstPlay = false;
    this._firstPlayRequestTime = Date.now();
    this._sendAnalytics(KavaEventModel.PLAY_REQUEST);
  }

  private _onSourceSelected(): void {
    const plugins = Object.values(this.player.plugins).map((plugin: any) => plugin.name);
    this._model.updateModel({ registeredPlugins: plugins.join(',') });

    this._sendAnalytics(KavaEventModel.IMPRESSION);

    if (!(this.player.isImage() || this.player.isLive())) {
      this.eventManager.listen(this.player, this.player.Event.Core.TIME_UPDATE, () => this._onTimeUpdate());
    }
  }

  private _onSeeking(): void {
    this._previousCurrentTime = this.player.currentTime!;
    this._model.updateModel({ targetPosition: this.player.currentTime! });
    this._sendAnalytics(KavaEventModel.SEEK);
  }

  private _onPause(): void {
    this._isPaused = true;
    this._timer.stop();
    this._sendAnalytics(KavaEventModel.PAUSE);
  }

  private _onEnded(): void {
    this._isEnded = true;
    this._onTimeUpdate();
    this._model.updateModel({ bufferTime: 0 });
  }

  private _onTimeUpdate(): void {
    this._updatePlayTimeSumModel();
    const percent = parseFloat((this.player.currentTime! / this.player.duration!).toFixed(2));
    if (!this._timePercentEvent.PLAY_REACHED_25 && percent >= 0.25) {
      this._timePercentEvent.PLAY_REACHED_25 = true;
      this._sendAnalytics(KavaEventModel.PLAY_REACHED_25_PERCENT);
    }
    if (!this._timePercentEvent.PLAY_REACHED_50 && percent >= 0.5) {
      this._timePercentEvent.PLAY_REACHED_50 = true;
      this._sendAnalytics(KavaEventModel.PLAY_REACHED_50_PERCENT);
    }
    if (!this._timePercentEvent.PLAY_REACHED_75 && percent >= 0.75) {
      this._timePercentEvent.PLAY_REACHED_75 = true;
      this._sendAnalytics(KavaEventModel.PLAY_REACHED_75_PERCENT);
    }
    if (!this._timePercentEvent.PLAY_REACHED_100 && percent === 1) {
      this._timePercentEvent.PLAY_REACHED_100 = true;
      this._sendAnalytics(KavaEventModel.PLAY_REACHED_100_PERCENT);
    }
  }

  private _onFragLoaded(event: FakeEvent): void {
    if (!this._fragLoadedFiredOnce) {
      this._fragLoadedFiredOnce = true;
    }
    this._updateFragLoadedStats(event);
    if (this._performanceObserver) {
      const succHandle = this._handleFragPerformanceObserver(event.payload.url);
      if (!succHandle) {
        this._pendingFragLoadedUrls.push(event.payload.url);
      }
    }
  }

  private _handleFragPerformanceObserver(url: string): boolean {
    const fragResourceTimings = this._performanceEntries.filter((entry) => entry.name === url);
    const lastFragResourceTiming: any =
      fragResourceTimings && fragResourceTimings.length ? fragResourceTimings[fragResourceTimings.length - 1] : null;
    if (lastFragResourceTiming) {
      this._updateMaxNetworkConnectionOverhead(lastFragResourceTiming.connectEnd - lastFragResourceTiming.domainLookupStart);
      const lastIndexOftheFragment: number = this._performanceEntries.indexOf(lastFragResourceTiming);
      if (lastIndexOftheFragment > -1 && lastIndexOftheFragment < this._performanceEntries.length) {
        this._performanceEntries = this._performanceEntries.splice(
          lastIndexOftheFragment + 1,
          this._performanceEntries.length - (lastIndexOftheFragment + 1)
        );
      }
      return true;
    } else {
      return false;
    }
  }

  private _updateMaxNetworkConnectionOverhead(networkConnectionOverhead: number): void {
    this._model.updateModel({
      maxNetworkConnectionOverhead: Math.max(this._model.maxNetworkConnectionOverhead, networkConnectionOverhead)
    });
  }

  private _updateFragLoadedStats(event: FakeEvent): void {
    const seconds = Math.round(event.payload.miliSeconds) / 1000;
    this._model.updateModel({
      totalSegmentsDownloadTime: this._model.totalSegmentsDownloadTime + seconds,
      totalSegmentsDownloadBytes: this._model.totalSegmentsDownloadBytes + event.payload.bytes,
      maxSegmentDownloadTime: Math.max(seconds, this._model.maxSegmentDownloadTime)
    });
  }

  private _onManifestLoaded(event: FakeEvent): void {
    const seconds = Math.round(event.payload.miliSeconds) / 1000;
    this._model.updateModel({
      maxManifestDownloadTime: Math.max(seconds, this._model.maxManifestDownloadTime)
    });
  }

  private _onTimedMetadataLoaded(event: FakeEvent): void {
    const id3TagCues = event.payload.cues.filter((entry) => entry.value && entry.value.key === TEXT_TYPE);
    if (id3TagCues.length) {
      try {
        const data = JSON.parse(id3TagCues[id3TagCues.length - 1].value.data);
        this._model.updateModel({ flavorParamsId: Number(data.sequenceId) });

        if (data.clipId) {
          const [partType, entryId] = data.clipId.split('-');

          switch (partType) {
            case 'preStartContent': {
              this._model.updateModel({ sourceEntryId: entryId, playbackMode: 1 });
              break;
            }
            case 'content': {
              this._model.updateModel({ sourceEntryId: entryId, playbackMode: 2 });
              break;
            }
            case 'postEntryContent': {
              this._model.updateModel({ sourceEntryId: entryId, playbackMode: 3 });
              break;
            }
            default:
              break;
          }
        }
      } catch (e) {
        this.logger.debug('error parsing id3', e);
      }
    }
  }

  private _onVideoTrackChanged(event: FakeEvent): void {
    const videoTrack = event.payload.selectedVideoTrack;
    this._rateHandler.setCurrent(videoTrack.bandwidth / DIVIDER);
    if (this.player.isAdaptiveBitrateEnabled()) {
      this._sendAnalytics(KavaEventModel.FLAVOR_SWITCH);
    } else {
      this._sendAnalytics(KavaEventModel.SOURCE_SELECTED);
    }
  }

  private _onAudioTrackChanged(event: FakeEvent): void {
    const audioTrack = event.payload.selectedAudioTrack;
    this._model.updateModel({ language: audioTrack.language });
    this._sendAnalytics(KavaEventModel.AUDIO_SELECTED);
  }

  private _onTextTrackChanged(event: FakeEvent): void {
    if (this._isPlaying) {
      const textTrack = event.payload.selectedTextTrack;
      this._model.updateModel({ caption: textTrack.language });
      this._sendAnalytics(KavaEventModel.CAPTIONS);
    }
  }

  private _onError(event: FakeEvent): void {
    if (event.payload && event.payload.severity === PKError.Severity.CRITICAL) {
      this._model.updateModel({
        errorCode: event.payload.code,
        errorDetails: event.payload.data,
        errorPosition: this._isFirstPlay ? ErrorPosition.PRE_PLAY : this._isFirstPlaying ? ErrorPosition.PRE_PLAYING : ErrorPosition.MID_STREAM
      });
      this._sendAnalytics(KavaEventModel.ERROR);
      this.reset();
    }
  }

  private _onPlaybackRateChanged(): void {
    if (!this.player.playbackRates.length || this.player.playbackRates.includes(this.player.playbackRate!)) {
      this._sendAnalytics(KavaEventModel.SPEED);
    }
  }

  private _onPlayerStateChanged(event: FakeEvent): void {
    const oldState = event.payload.oldState;
    const newState = event.payload.newState;
    if (oldState.type === this.player.State.BUFFERING) {
      this._isBuffering = false;
      this._updateBufferModel();
      this._sendAnalytics(KavaEventModel.BUFFER_END);
    }
    if (newState.type === this.player.State.BUFFERING) {
      this._isBuffering = true;
      this._bufferStartTime = Date.now();
      this._sendAnalytics(KavaEventModel.BUFFER_START);
    }
  }

  private _onRelatedClicked(): void {
    this._sendAnalytics(KavaEventModel.RELATED_OPEN);
  }

  private _onRelatedSelected(): void {
    this._sendAnalytics(KavaEventModel.RELATED_SELECTED);
  }

  private _onShareClicked(): void {
    this._sendAnalytics(KavaEventModel.SHARE_CLICKED);
  }

  private _onShareNetworkClicked(event: FakeEvent): void {
    const shareNetworkName = event.payload.shareNetworkName;
    if (shareNetworkName) {
      this._model.updateModel({ shareNetworkName: shareNetworkName });
      this._sendAnalytics(KavaEventModel.SHARE_NETWORK);
    }
  }

  private _onReportSubmitted(event: FakeEvent): void {
    const reportType = event.payload.reportType;
    if (reportType) {
      this._model.updateModel({ reportType });
      this._sendAnalytics(KavaEventModel.REPORT_SUBMITTED);
    }
  }

  private _onReportClicked(): void {
    this._sendAnalytics(KavaEventModel.REPORT_CLICKED);
  }

  private _onInfoScreenOpened(): void {
    this._sendAnalytics(KavaEventModel.INFO);
  }

  private _onDownloadItemClicked(): void {
    this._sendAnalytics(KavaEventModel.DOWNLOAD);
  }

  private _onFullScreenChanged(screenMode: number): void {
    this._model.updateModel({ screenMode: screenMode });
    this._sendAnalytics(screenMode === ScreenMode.FULLSCREEN ? KavaEventModel.ENTER_FULLSCREEN : KavaEventModel.EXIT_FULLSCREEN);
  }

  private _updateSessionStartTimeModel(response: any | number): void {
    if (!this._model.getSessionStartTime() && response) {
      if (typeof response === 'object') {
        this._model.updateModel({ sessionStartTime: response.time });
        this._viewEventEnabled = response.viewEventsEnabled;
      } else {
        this._model.updateModel({ sessionStartTime: response });
      }
    }
    if (this._timer.isStopped()) {
      this._model.updateModel({ sessionStartTime: null });
    }
  }

  private _updateBufferModel(): void {
    const duration = Kava._getTimeDifferenceInSeconds(this._bufferStartTime);
    this._model.updateModel({
      bufferTime: this._model.getBufferTime() + duration,
      bufferTimeSum: this._model.getBufferTimeSum() + duration
    });
  }

  private _updatePlayTimeSumModel(): void {
    let delta;
    if (this.player.isLive()) {
      delta = this.config.viewEventCountdown - this._model.getBufferTime();
    } else {
      delta = this.player.currentTime! - this._previousCurrentTime;
      this._previousCurrentTime = this.player.currentTime!;
    }
    this._model.updateModel({ playTimeSum: this._model.getPlayTimeSum() + delta });
  }

  private _setModelDelegates(): void {
    this._model.getPlaybackSpeed = (): number | null => this.player.playbackRate;
    this._model.getActualBitrate = (): number => this._rateHandler.getCurrent();
    this._model.getAverageBitrate = (): number => this._rateHandler.getAverage();
    this._model.getPartnerId = (): number => this.config.partnerId;
    this._model.getEntryId = (): string => this.config.entryId;
    this._model.getPlaylistId = (): string => this.config.playlistId;
    this._model.getSessionId = (): string => this.config.sessionId;
    this._model.getPersistentSessionId = (): string => this.config.persistentSessionId;
    this._model.getClientVer = (): string => this.config.playerVersion;
    this._model.getClientTag = (): string => 'html5:v' + this.config.playerVersion;
    this._model.getKS = (): string => this.config.ks;
    this._model.getVirtualEventId = (): string => this.config.virtualEventId;
    this._model.getUIConfId = (): string => this.config.uiConfId;
    this._model.getReferrer = (): string => this.config.referrer;
    this._model.getCustomVar1 = (): string => this.config.customVar1;
    this._model.getCustomVar2 = (): string => this.config.customVar2;
    this._model.getCustomVar3 = (): string => this.config.customVar3;
    this._model.getPosition = (): number => this._getPosition();
    this._model.getDeliveryType = (): string => this._getDeliveryType();
    this._model.getPlaybackType = (): string => this._getPlaybackType();
    this._model.getPlaybackContext = (): string => this.config.playbackContext;
    this._model.getApplication = (playerEvent?: boolean): string => this._getApplication(playerEvent);
    this._model.getKalturaApplicationVersion = (): string => this.config.kalturaApplicationVersion;
    this._model.getKalturaApplication = (): string => this._getKalturaApplicationId(this.config.kalturaApplication);
    this._model.getUserId = (): string => this.config.userId;
    this._model.getHostingKalturaApplication = (): string => this.config.application;
    this._model.getHostingKalturaApplicationVersion = (): string => this.config.applicationVersion;
    this._model.getPlayerSkin = (): number => this._getPlayerSkin();
    this._model.getV2ToV7Redirect = (): boolean => this.player.isV2ToV7Redirected;
    this._model.getNumFailedAnalyticReports = (): number => this.getNumFailedAnalyticReports();
  }

  private getNumFailedAnalyticReports(): number {
    return parseInt(LocalStorageManager.getItem(this.getFailedCounterKey(this.config.entryId)) || 0);
  }

  private _getApplication(playerEvent = true): string {
    // for player event, we want to return the application value from the configuration
    // otherwise (i.e. application event), we want to return the player type
    return playerEvent ? this.config.application : this._getPlayerType();
  }

  private _getPlayerType(): Application {
    if (this.player.plugins.reels !== undefined) {
      return Application.REELS;
    } else if (this.player.plugins.audioPlayer !== undefined) {
      return Application.AUDIO;
    } else {
      return Application.VIDEO;
    }
  }

  private _getPlayerSkin(): PlayerSkin {
    if (this.player.plugins.reels !== undefined) {
      return PlayerSkin.REELS;
    } else if (this.player.plugins.audioPlayer !== undefined) {
      return PlayerSkin.AUDIO;
    } else {
      return PlayerSkin.PLAYER;
    }
  }

  private _getKalturaApplicationId(kalturaAppName: string): string {
    if (kalturaAppName in KalturaApplication) {
      return KalturaApplication[kalturaAppName];
    } else {
      this.logger.warn('Kava analytics - unknon kalturaAppName: ' + kalturaAppName);
      return '';
    }
  }

  private _getPosition(): number {
    if (this.player.isLive()) {
      if (!Number.isNaN(this.player.duration)) {
        if (this.player.duration! - this.player.currentTime! < 1) {
          return 0;
        }
        return -(this.player.duration! - this.player.currentTime!);
      }
      return 0;
    }
    let currentTime = this.player.currentTime;
    if (typeof this.player.sources.seekFrom === 'number' && currentTime) {
      currentTime += this.player.sources.seekFrom;
    }
    return this._isFirstPlaying ? currentTime! || this.player.sources.startTime || 0 : currentTime!;
  }

  private _getDeliveryType(): string {
    if (this.player.streamType === this.player.StreamType.PROGRESSIVE) {
      return 'url';
    }
    return this.player.streamType;
  }

  private _getPlaybackType(): string {
    if (this.player.isLive()) {
      if (this.player.isDvr()) {
        const distanceFromLiveEdge = this.player.duration! - this.player.currentTime!;
        if (distanceFromLiveEdge >= this.config.dvrThreshold) {
          return 'dvr';
        }
      }
      return 'live';
    }
    return 'vod';
  }

  private _validate(): boolean {
    if (!this.config.partnerId) {
      this._logMissingParam('partnerId');
      return false;
    }
    if (!this.config.entryId) {
      this._logMissingParam('entryId');
      return false;
    }
    return true;
  }

  private _isApplicationEventValid(event: FakeEvent): boolean {
    const model = getApplicationEventsModel(ApplicationEventsModel[event.type], this._model, event.payload);
    return !!model.buttonName || !!model.pageName;
  }

  private _logMissingParam(missingParam: string): void {
    this.logger.warn(`Kava analytics block report because of missing param ${missingParam}`);
  }

  private static _getTimeDifferenceInSeconds(time: number): number {
    return (Date.now() - time) / 1000.0;
  }

  private _updateTabModeInModel(hiddenAttr: string): void {
    this._model.updateModel({
      // $FlowFixMe
      tabMode: this._isTabHidden(hiddenAttr) && !this.player.isInPictureInPicture() ? TabMode.TAB_NOT_FOCUSED : TabMode.TAB_FOCUSED
    });
  }

  private _isTabHidden(hiddenAttr: string): boolean {
    return document[hiddenAttr];
  }

  private _initTabMode(): void {
    let hiddenAttr: string;
    let visibilityChangeEventName: string;
    if (typeof document.hidden !== 'undefined') {
      // Opera 12.10 and Firefox 18 and later support
      hiddenAttr = 'hidden';
      visibilityChangeEventName = 'visibilitychange';
      // @ts-expect-error - Property 'msHidden' does not exist on type 'Document'. Did you mean 'hidden'?
    } else if (typeof document.msHidden !== 'undefined') {
      hiddenAttr = 'msHidden';
      visibilityChangeEventName = 'msvisibilitychange';
      // @ts-expect-error - Property 'webkitHidden' does not exist on type 'Document'. Did you mean 'hidden'?
    } else if (typeof document.webkitHidden !== 'undefined') {
      hiddenAttr = 'webkitHidden';
      visibilityChangeEventName = 'webkitvisibilitychange';
    }

    // @ts-expect-error - Variable 'visibilityChangeEventName' is used before being assigned.
    if (hiddenAttr && visibilityChangeEventName) {
      this.eventManager.listen(document, visibilityChangeEventName, () => this._updateTabModeInModel(hiddenAttr));
      this._updateTabModeInModel(hiddenAttr);
    }
  }
}

export { Kava };
