// @flow
import {EventManager, FakeEvent, Player} from '@playkit-js/playkit-js';
import {KavaModel} from './kava-model';
import {KavaAdEventModel} from './kava-ad-event-model';

import {Kava} from './kava';
class KavaAds {
  _eventManager: EventManager;
  _player: Player;
  _kava: Kava;
  _model: KavaModel;
  _sendAnalytics: Function;
  _isBuffering: boolean = false;

  constructor(eventManager: EventManager, player: Player, kava: Kava, model: KavaModel, sendAnalytics: Function) {
    this._eventManager = eventManager;
    this._player = player;
    this._kava = kava;
    this._model = model;
    this._sendAnalytics = sendAnalytics;
  }

  addBindings(): void {
    this._eventManager.listen(this._player, this._player.Event.AD_LOADED, event => this._onAdLoaded(event));
    this._eventManager.listen(this._player, this._player.Event.AD_STARTED, () => this._onAdStarted());
    this._eventManager.listen(this._player, this._player.Event.AD_SKIPPED, () => this._onAdSkipped());
    this._eventManager.listen(this._player, this._player.Event.AD_BREAK_START, event => this._onAdBreakStarted(event));
    this._eventManager.listen(this._player, this._player.Event.AD_PROGRESS, event => this._onAdProgress(event));
    this._eventManager.listen(this._player, this._player.Event.AD_ERROR, event => this._onAdError(event));
    this._eventManager.listen(this._player, this._player.Event.AD_BREAK_END, () => this._onAdBreakEnd());
    this._eventManager.listen(this._player, this._player.Event.AD_FIRST_QUARTILE, () => this._onAdFirstQuartile());
    this._eventManager.listen(this._player, this._player.Event.AD_MIDPOINT, () => this._onAdMidPoint());
    this._eventManager.listen(this._player, this._player.Event.AD_THIRD_QUARTILE, () => this._onAdThirdQuartile());
    this._eventManager.listen(this._player, this._player.Event.AD_COMPLETED, () => this._onAdCompleted());
    this._eventManager.listen(this._player, this._player.Event.AD_BUFFERING, () => this._onAdBuffering());
    this._eventManager.listen(this._player, this._player.Event.AD_CLICKED, () => this._onAdClicked());
  }

  _onAdLoaded(event: FakeEvent): void {
    this._kava.logger.debug('_onAdLoaded', event);
    this._model.updateModel({adId: event.payload.ad._id});
    this._model.updateModel({adTitle: event.payload.ad._title});
    this._model.updateModel({adPosition: event.payload.ad._position});
    this._model.updateModel({adSystem: event.payload.ad._system});
    this._model.updateModel({advertiserName: event.payload.ad._advertiserName});
    this._model.updateModel({adBreakType: event.payload.adType});
    this._model.updateModel({adImpressionTimeStamp: Date.now()});
    this._sendAnalytics(KavaAdEventModel.AD_IMPRESSION);
  }

  _onAdBuffering(): void {
    this._sendAnalytics(KavaAdEventModel.AD_BUFFER_START);
    this._isBuffering = true;
  }
  _onAdClicked(): void {
    this._sendAnalytics(KavaAdEventModel.AD_CLICKED);
  }

  _onAdCompleted(): void {
    this._kava.logger.debug('_onAdCompleted');
    this._sendAnalytics(KavaAdEventModel.AD_COMPLETED);
    this._clearAdStartedModelData();
  }

  _clearAdStartedModelData() {
    this._model.updateModel({
      adId: NaN,
      adTitle: '',
      adPosition: NaN,
      adSystem: '',
      advertiserName: '',
      adImpressionTimeStamp: 0,
      adCurrentTime: 0
    });

    this._isBuffering = false;
  }
  _onAdSkipped(): void {
    this._kava.logger.debug('_onAdSkipped');
    this._sendAnalytics(KavaAdEventModel.AD_SKIPPED);
    this._clearAdStartedModelData();
  }
  _onAdStarted(): void {
    this._kava.logger.debug('_onAdStarted');
    this._sendAnalytics(KavaAdEventModel.AD_STARTED);
  }

  _onAdFirstQuartile(): void {
    this._sendAnalytics(KavaAdEventModel.AD_FIRST_QUARTILE);
  }

  _onAdMidPoint(): void {
    this._sendAnalytics(KavaAdEventModel.AD_MID_POINT);
  }

  _onAdThirdQuartile(): void {
    this._sendAnalytics(KavaAdEventModel.AD_THIRD_QUARTILE);
  }

  _onAdBreakEnd(): void {
    this._kava.logger.debug('_onAdBreakEnd');
    this._model.updateModel({adBreakType: ''});
  }

  _onAdProgress(event: FakeEvent): void {
    this._model.updateModel({adCurrentTime: event.payload.adProgress.currentTime});
    if (this._isBuffering) {
      this._sendAnalytics(KavaAdEventModel.AD_BUFFER_END);
      this._isBuffering = false;
    }
  }

  _onAdBreakStarted(event: FakeEvent): void {
    this._kava.logger.debug('_onAdBreakStarted', event.payload.adBreak._type);
    // the type might be deprecated in the impression so this will be a fallback
    this._model.updateModel({adBreakType: event.payload.adBreak._type});
  }

  _onAdError(event: FakeEvent): void {
    this._kava.logger.debug('_onAdError', event);
    this._model.updateModel({adErrorCode: event.payload.code});
    this._sendAnalytics(KavaAdEventModel.AD_ERROR);
    this._model.updateModel({adErrorCode: NaN});
    this._clearAdStartedModelData();
  }
}

export {KavaAds};
