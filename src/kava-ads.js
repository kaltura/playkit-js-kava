// @flow
import {EventManager, FakeEvent, Player} from '@playkit-js/playkit-js';
import {KavaEventModel} from './kava-event-model';
import {KavaModel} from './kava-model';
import {Kava} from './kava';
class KavaAds {
  _eventManager: EventManager;
  _player: Player;
  _kava: Kava;
  _model: KavaModel;
  _sendAnalytics: Function;

  constructor(eventManager: EventManager, player: Player, kava: Kava, model: KavaModel, sendAnalytics: Function) {
    this._eventManager = eventManager;
    this._player = player;
    this._kava = kava;
    this._model = model;
    this._sendAnalytics = sendAnalytics;
  }

  addBindings(): void {
    this._eventManager.listen(this._player, this._player.Event.AD_STARTED, event => this._onAdStarted(event));
    this._eventManager.listen(this._player, this._player.Event.AD_COMPLETED, () => this._onAdCompleted());
    this._eventManager.listen(this._player, this._player.Event.AD_SKIPPED, () => this._onAdSkipped());
    this._eventManager.listen(this._player, this._player.Event.AD_BREAK_START, event => this._onAdBreakStarted(event));
    this._eventManager.listen(this._player, this._player.Event.AD_BREAK_END, () => this._onAdBreakEnd());
  }

  _onAdCompleted(): void {
    this._kava._logger.debug('_onAdCompleted');
    this._clearAdStartedModelData();
  }

  _clearAdStartedModelData() {
    this._model.updateModel({adId: NaN});
    this._model.updateModel({adTitle: ''});
    this._model.updateModel({adPosition: NaN});
    this._model.updateModel({adSystem: ''});
  }
  _onAdSkipped(): void {
    this._kava.logger.debug('_onAdSkipped');
    this._clearAdStartedModelData();
  }
  _onAdStarted(event: FakeEvent): void {
    this._kava.logger.debug('_onAdStarted', event.payload.ad._id);
    this._model.updateModel({adId: event.payload.ad._id});
    this._model.updateModel({adTitle: event.payload.ad._title});
    this._model.updateModel({adPosition: event.payload.ad._position});
    this._model.updateModel({adSystem: event.payload.ad._system});

    this._sendAnalytics(KavaEventModel.AD_STARTED);
  }

  _onAdBreakEnd(): void {
    this._kava.logger.debug('_onAdBreakEnd');
    this._model.updateModel({adBreakType: ''});
  }

  _onAdBreakStarted(event: FakeEvent): void {
    this._kava.logger.debug('_onAdBreakStarted', event.payload.adBreak._type);
    this._model.updateModel({adBreakType: event.payload.adBreak._type});
  }
}

export {KavaAds};
