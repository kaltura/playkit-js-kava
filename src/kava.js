// @flow
import {BasePlugin, Error as PKError, FakeEvent} from 'playkit-js';
import {OVPAnalyticsService} from 'playkit-js-providers/dist/playkit-analytics-service';
import {KavaEventModel} from './kava-event-model';
import KavaRateHandler from './kava-rate-handler';
import KavaTimer from './kava-timer';
import KavaModel from './kava-model';

/**
 * KAVA (Kaltura Advanced Analytics) plugin class.
 * @constructor
 * @param {string} name - The plugin name.
 * @param {Player} player - The player instance.
 * @param {Object} config - The plugin config.
 */
export default class Kava extends BasePlugin {
  _model: KavaModel;
  _timer: KavaTimer;
  _rateHandler: KavaRateHandler;
  _viewEventEnabled: boolean;
  _firstPlayRequestTime: number;
  _bufferStartTime: number;
  _isFirstPlay: boolean;
  _isEnded: boolean;
  _isPaused: boolean;
  _isBuffering: boolean;
  _timePercentEvent: {[time: string]: boolean};

  /**
   * The default config of the plugin.
   * @type {Object}
   * @static
   */
  static defaultConfig: Object = {
    serviceUrl: '//analytics.kaltura.com/api_v3/index.php',
    viewEventCountdown: 10,
    resetSessionCountdown: 30,
    dvrThreshold: 120,
    playbackContext: '',
    applicationVersion: ''
  };

  /**
   * Runs the plugin validation logic.
   * @type {Object}
   * @static
   * @return {boolean} - Whether the plugin is valid or not.
   */
  static isValid(): boolean {
    return true;
  }

  constructor(name: string, player: Player, config: Object) {
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
  }

  /**
   * Runs the destroy logic of the plugin.
   * @public
   * @return {void}
   */
  destroy(): void {
    this.eventManager.destroy();
    this._timer.destroy();
    this._rateHandler.destroy();
  }

  /**
   * Runs the reset logic of the plugin.
   * @public
   * @return {void}
   */
  reset(): void {
    this.eventManager.removeAll();
    this._rateHandler.destroy();
    this._timer.destroy();
    this._resetFlags();
    this._addBindings();
    this._model.updateModel({
      eventIndex: 1,
      bufferTime: 0.0,
      bufferTimeSum: 0.0,
      playTimeSum: 0.0,
      sessionStartTime: null
    });
  }

  _resetFlags(): void {
    this._isFirstPlay = true;
    this._isEnded = false;
    this._isPaused = false;
    this._isBuffering = false;
    this._timePercentEvent = {
      PLAY_REACHED_25_PERCENT: false,
      PLAY_REACHED_50_PERCENT: false,
      PLAY_REACHED_75_PERCENT: false,
      PLAY_REACHED_100_PERCENT: false
    };
  }

  _resetSession(): void {
    this.logger.debug('Reset KAVA session');
    this._rateHandler.reset();
    this._model.updateModel({
      eventIndex: 1,
      bufferTimeSum: 0.0,
      playTimeSum: 0.0
    });
  }

  _sendAnalytics(eventObj: KavaEvent): void {
    if (!this._validate()) {
      return;
    }

    if (this._isBuffering) {
      this._updateBufferModel();
      this._bufferStartTime = Date.now();
    }

    const model = this._model.getModel(eventObj);
    OVPAnalyticsService.trackEvent(this.config.serviceUrl, model)
      .doHttpRequest()
      .then(
        response => {
          this.logger.debug(`KAVA event sent`, eventObj.type, model);
          this._updateSessionStartTimeModel(response);
        },
        err => {
          this.logger.error(`Failed to send KAVA event`, eventObj.type, model, err);
        }
      );
    this._model.updateModel({eventIndex: this._model.getEventIndex() + 1});
  }

  _addBindings(): void {
    this.eventManager.listen(this._timer, KavaTimer.Event.TICK, () => this._rateHandler.countCurrent());
    this.eventManager.listen(this._timer, KavaTimer.Event.REPORT, () => this._onReport());
    this.eventManager.listen(this._timer, KavaTimer.Event.RESET, () => this._resetSession());
    this.eventManager.listen(this.player, this.player.Event.SOURCE_SELECTED, () => this._onSourceSelected());
    this.eventManager.listen(this.player, this.player.Event.ERROR, event => this._onError(event));
    this.eventManager.listen(this.player, this.player.Event.FIRST_PLAY, () => this._onFirstPlay());
    this.eventManager.listen(this.player, this.player.Event.TRACKS_CHANGED, () => this._setInitialTracks());
    this.eventManager.listen(this.player, this.player.Event.PLAYING, () => this._onPlaying());
    this.eventManager.listen(this.player, this.player.Event.SEEKING, () => this._onSeeking());
    this.eventManager.listen(this.player, this.player.Event.PAUSE, () => this._onPause());
    this.eventManager.listen(this.player, this.player.Event.ENDED, () => this._onEnded());
    this.eventManager.listen(this.player, this.player.Event.TIME_UPDATE, () => this._onTimeUpdate());
    this.eventManager.listen(this.player, this.player.Event.VIDEO_TRACK_CHANGED, event => this._onVideoTrackChanged(event));
    this.eventManager.listen(this.player, this.player.Event.ABR_MODE_CHANGED, event => this._onAbrModeChanged(event));
    this.eventManager.listen(this.player, this.player.Event.AUDIO_TRACK_CHANGED, event => this._onAudioTrackChanged(event));
    this.eventManager.listen(this.player, this.player.Event.TEXT_TRACK_CHANGED, event => this._onTextTrackChanged(event));
    this.eventManager.listen(this.player, this.player.Event.PLAYER_STATE_CHANGED, event => this._onPlayerStateChanged(event));
  }

  _getRates(): Array<number> {
    const rates = [];
    const videoTracks = this.player.getTracks(this.player.Track.VIDEO);
    videoTracks.forEach(videoTrack => rates.push(videoTrack.bandwidth));
    return rates;
  }

  _setInitialTracks(): void {
    const rates = this._getRates();
    const activeTracks = this.player.getActiveTracks();
    this._rateHandler.setRates(rates);
    if (activeTracks.video) {
      this._rateHandler.setCurrent(activeTracks.video.bandwidth);
    }
    if (activeTracks.audio) {
      this._model.updateModel({language: activeTracks.audio.language});
    }
    if (activeTracks.text) {
      this._model.updateModel({caption: activeTracks.text.language});
    }
  }

  _onReport(): void {
    if (this._viewEventEnabled) {
      this._updatePlayTimeSumModel();
      this._sendAnalytics(KavaEventModel.VIEW);
    } else {
      this.logger.warn(`VIEW event blocked because server response of viewEventsEnabled=false`);
    }
    this._model.updateModel({bufferTime: 0});
  }

  _onPlaying(): void {
    if (this._isFirstPlay) {
      this._timer.start();
      this._isFirstPlay = false;
      this._model.updateModel({
        joinTime: Kava._getTimeDifferenceInSeconds(this._firstPlayRequestTime)
      });
      this._sendAnalytics(KavaEventModel.PLAY);
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

  _onFirstPlay(): void {
    this._firstPlayRequestTime = Date.now();
    this._sendAnalytics(KavaEventModel.PLAY_REQUEST);
  }

  _onSourceSelected(): void {
    this._sendAnalytics(KavaEventModel.IMPRESSION);
  }

  _onSeeking(): void {
    this._model.updateModel({targetPosition: this.player.currentTime});
    this._sendAnalytics(KavaEventModel.SEEK);
  }

  _onPause(): void {
    this._isPaused = true;
    this._timer.stop();
    this._sendAnalytics(KavaEventModel.PAUSE);
  }

  _onEnded(): void {
    this._isEnded = true;
    this._onTimeUpdate();
    this._model.updateModel({bufferTime: 0});
  }

  _onTimeUpdate(): void {
    if (!this.player.isLive()) {
      const percent = this.player.currentTime / this.player.duration;
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
  }

  _onVideoTrackChanged(event: FakeEvent): void {
    const videoTrack = event.payload.selectedVideoTrack;
    this._rateHandler.setCurrent(videoTrack.bandwidth);
    if (!this.player.isAdaptiveBitrateEnabled()) {
      this._sendAnalytics(KavaEventModel.SOURCE_SELECTED);
    } else {
      this._sendAnalytics(KavaEventModel.FLAVOR_SWITCH);
    }
  }

  _onAbrModeChanged(event: FakeEvent) {
    const mode = event.payload.mode;
    if (mode === this.player.AbrMode.AUTO) {
      this._rateHandler.setCurrent(0);
      this._sendAnalytics(KavaEventModel.SOURCE_SELECTED);
    }
  }

  _onAudioTrackChanged(event: FakeEvent): void {
    const audioTrack = event.payload.selectedAudioTrack;
    this._model.updateModel({language: audioTrack.language});
    this._sendAnalytics(KavaEventModel.AUDIO_SELECTED);
  }

  _onTextTrackChanged(event: FakeEvent): void {
    const textTrack = event.payload.selectedTextTrack;
    this._model.updateModel({caption: textTrack.language});
    this._sendAnalytics(KavaEventModel.CAPTIONS);
  }

  _onError(event: FakeEvent): void {
    if (event.payload && event.payload.severity === PKError.Severity.CRITICAL) {
      this._model.updateModel({errorCode: event.payload.code});
      this._sendAnalytics(KavaEventModel.ERROR);
      this.reset();
    }
  }

  _onPlayerStateChanged(event: FakeEvent): void {
    const oldState = event.payload.oldState;
    const newState = event.payload.newState;
    if (oldState.type === this.player.State.BUFFERING) {
      this._isBuffering = false;
      this._updateBufferModel();
    }
    if (newState.type === this.player.State.BUFFERING) {
      this._isBuffering = true;
      this._bufferStartTime = Date.now();
    }
  }

  _updateSessionStartTimeModel(response: Object | number): void {
    if (!this._model.getSessionStartTime() && response) {
      if (typeof response === 'object') {
        this._model.updateModel({sessionStartTime: response.time});
        this._viewEventEnabled = response.viewEventsEnabled;
      } else {
        this._model.updateModel({sessionStartTime: response});
      }
    }
    if (this._timer.isStopped()) {
      this._model.updateModel({sessionStartTime: null});
    }
  }

  _updateBufferModel(): void {
    const duration = Kava._getTimeDifferenceInSeconds(this._bufferStartTime);
    this._model.updateModel({
      bufferTime: this._model.getBufferTime() + duration,
      bufferTimeSum: this._model.getBufferTimeSum() + duration
    });
  }

  _updatePlayTimeSumModel(): void {
    const delta = this.config.viewEventCountdown - this._model.getBufferTime();
    this._model.updateModel({playTimeSum: this._model.getPlayTimeSum() + delta});
  }

  _setModelDelegates() {
    this._model.getActualBitrate = () => this._rateHandler.getCurrent();
    this._model.getAverageBitrate = () => this._rateHandler.getAverage();
    this._model.getPartnerId = () => this.config.partnerId;
    this._model.getEntryId = () => this.config.entryId;
    this._model.getSessionId = () => this.config.sessionId;
    this._model.getClientVer = () => this.config.playerVersion;
    this._model.getClientTag = () => 'html5:v' + this.config.playerVersion;
    this._model.getKS = () => this.config.ks;
    this._model.getUIConfId = () => this.config.uiConfId;
    this._model.getReferrer = () => btoa(this.config.referrer);
    this._model.getCustomVar1 = () => this.config.customVar1;
    this._model.getCustomVar2 = () => this.config.customVar2;
    this._model.getCustomVar3 = () => this.config.customVar3;
    this._model.getPosition = () => this._getPosition();
    this._model.getDeliveryType = () => this._getDeliveryType();
    this._model.getPlaybackType = () => this._getPlaybackType();
    this._model.getPlaybackContext = () => this.config.playbackContext;
    this._model.getApplicationVersion = () => this.config.applicationVersion;
  }

  _getPosition(): number {
    if (this.player.isLive()) {
      if (!Number.isNaN(this.player.duration)) {
        if (this.player.duration - this.player.currentTime < 1) {
          return 0;
        }
        return -(this.player.duration - this.player.currentTime);
      }
      return 0;
    }
    return this.player.currentTime;
  }

  _getDeliveryType(): string {
    if (this.player.streamType === this.player.StreamType.PROGRESSIVE) {
      return 'url';
    }
    return this.player.streamType;
  }

  _getPlaybackType(): string {
    if (this.player.isLive()) {
      if (this.player.isDvr()) {
        const distanceFromLiveEdge = this.player.duration - this.player.currentTime;
        if (distanceFromLiveEdge >= this.config.dvrThreshold) {
          return 'dvr';
        }
      }
      return 'live';
    }
    return 'vod';
  }

  _validate(): boolean {
    if (!this.config.partnerId) {
      Kava._logMissingParam('partnerId');
      return false;
    }
    if (!this.config.entryId) {
      Kava._logMissingParam('entryId');
      return false;
    }
    return true;
  }

  static _getTimeDifferenceInSeconds(time): number {
    return (Date.now() - time) / 1000.0;
  }

  static _logMissingParam(missingParam: string): void {
    this.logger.warn(`Kava analytics block report because of missing param ${missingParam}`);
  }
}
