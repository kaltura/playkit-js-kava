// @flow
import {KavaModel} from './kava-model';

/**
 * @name KavaEventType
 * @enum
 */
export const KavaEventModel: {[event: string]: KavaEvent} = {
  /**
   * @type {string} VIEW
   * @memberof KavaEventType
   */
  VIEW: {
    type: 'VIEW',
    index: 99,
    getEventModel: (model: KavaModel) => ({
      playTimeSum: model.getPlayTimeSum(),
      bufferTime: model.getBufferTime(),
      bufferTimeSum: model.getBufferTimeSum(),
      actualBitrate: model.getActualBitrate(),
      averageBitrate: model.getAverageBitrate()
    })
  },
  /**
   * @type {string} IMPRESSION
   * @memberof KavaEventType
   */
  IMPRESSION: {
    type: 'IMPRESSION',
    index: 1,
    getEventModel: () => ({})
  },
  /**
   * @type {string} PLAY_REQUEST
   * @memberof KavaEventType
   */
  PLAY_REQUEST: {
    type: 'PLAY_REQUEST',
    index: 2,
    getEventModel: () => ({})
  },
  /**
   * @type {string} PLAY
   * @memberof KavaEventType
   */
  PLAY: {
    type: 'PLAY',
    index: 3,
    getEventModel: (model: KavaModel) => ({
      bufferTime: model.getBufferTime(),
      bufferTimeSum: model.getBufferTimeSum(),
      actualBitrate: model.getActualBitrate(),
      joinTime: model.getJoinTime()
    })
  },
  /**
   * @type {string} RESUME
   * @memberof KavaEventType
   */
  RESUME: {
    type: 'RESUME',
    index: 4,
    getEventModel: (model: KavaModel) => ({
      bufferTime: model.getBufferTime(),
      bufferTimeSum: model.getBufferTimeSum(),
      actualBitrate: model.getActualBitrate()
    })
  },
  /**
   * @type {string} PAUSE
   * @memberof KavaEventType
   */
  PAUSE: {
    type: 'PAUSE',
    index: 33,
    getEventModel: () => ({})
  },
  /**
   * @type {string} BUFFER_START
   * @memberof KavaEventType
   */
  BUFFER_START: {
    type: 'BUFFER_START',
    index: 45,
    getEventModel: () => ({})
  },
  /**
   * @type {string} BUFFER_END
   * @memberof KavaEventType
   */
  BUFFER_END: {
    type: 'BUFFER_END',
    index: 46,
    getEventModel: () => ({})
  },
  /**
   * @type {string} REPLAY
   * @memberof KavaEventType
   */
  REPLAY: {
    type: 'REPLAY',
    index: 34,
    getEventModel: () => ({})
  },
  /**
   * @type {string} SEEK
   * @memberof KavaEventType
   */
  SEEK: {
    type: 'SEEK',
    index: 35,
    getEventModel: (model: KavaModel) => ({
      targetPosition: model.getTargetPosition()
    })
  },
  /**
   * @type {string} PLAY_REACHED_25_PERCENT
   * @memberof KavaEventType
   */
  PLAY_REACHED_25_PERCENT: {
    type: 'PLAY_REACHED_25_PERCENT',
    index: 11,
    getEventModel: () => ({})
  },
  /**
   * @type {string} PLAY_REACHED_50_PERCENT
   * @memberof KavaEventType
   */
  PLAY_REACHED_50_PERCENT: {
    type: 'PLAY_REACHED_50_PERCENT',
    index: 12,
    getEventModel: () => ({})
  },
  /**
   * @type {string} PLAY_REACHED_75_PERCENT
   * @memberof KavaEventType
   */
  PLAY_REACHED_75_PERCENT: {
    type: 'PLAY_REACHED_75_PERCENT',
    index: 13,
    getEventModel: () => ({})
  },
  /**
   * @type {string} PLAY_REACHED_100_PERCENT
   * @memberof KavaEventType
   */
  PLAY_REACHED_100_PERCENT: {
    type: 'PLAY_REACHED_100_PERCENT',
    index: 14,
    getEventModel: () => ({})
  },
  /**
   * @type {string} SOURCE_SELECTED
   * @memberof KavaEventType
   */
  SOURCE_SELECTED: {
    type: 'SOURCE_SELECTED',
    index: 39,
    getEventModel: (model: KavaModel) => ({
      actualBitrate: model.getActualBitrate()
    })
  },
  /**
   * @type {string} AUDIO_SELECTED
   * @memberof KavaEventType
   */
  AUDIO_SELECTED: {
    type: 'AUDIO_SELECTED',
    index: 42,
    getEventModel: (model: KavaModel) => ({
      language: model.getLanguage()
    })
  },
  /**
   * @type {string} FLAVOR_SWITCH
   * @memberof KavaEventType
   */
  FLAVOR_SWITCH: {
    type: 'FLAVOR_SWITCH',
    index: 43,
    getEventModel: (model: KavaModel) => ({
      actualBitrate: model.getActualBitrate()
    })
  },
  /**
   * @type {string} CAPTIONS
   * @memberof KavaEventType
   */
  CAPTIONS: {
    type: 'CAPTIONS',
    index: 38,
    getEventModel: (model: KavaModel) => ({
      caption: model.getCaption()
    })
  },
  /**
   * @type {string} ERROR
   * @memberof KavaEventType
   */
  ERROR: {
    type: 'ERROR',
    index: 98,
    getEventModel: (model: KavaModel) => ({
      errorCode: model.getErrorCode()
    })
  }
};

export const KavaEventType: {[event: string]: string} = (eventType => {
  Object.keys(KavaEventModel).forEach(k => (eventType[k] = k));
  return eventType;
})({});

/**
 * Gets the full event model for a certain event object including the common params.
 * @private
 * @param {KavaEvent} eventObj - The event model.
 * @param {KavaModel} model - The plugin model store.
 * @returns {Object} - The full event model.
 */
export function getEventModel(eventObj: KavaEvent, model: KavaModel): Object {
  const commonModel: Object = {
    eventType: eventObj.index,
    partnerId: model.getPartnerId(),
    entryId: model.getEntryId(),
    sessionId: model.getSessionId(),
    eventIndex: model.getEventIndex(),
    referrer: model.getReferrer(),
    deliveryType: model.getDeliveryType(),
    playbackType: model.getPlaybackType(),
    clientVer: model.getClientVer(),
    clientTag: model.getClientTag(),
    position: model.getPosition()
  };
  if (model.getSessionStartTime()) {
    commonModel.sessionStartTime = model.getSessionStartTime();
  }
  if (model.getKS()) {
    commonModel.ks = model.getKS();
  }
  if (model.getUIConfId()) {
    commonModel.uiConfId = model.getUIConfId();
  }
  if (model.getPlaylistId()) {
    commonModel.playlistId = model.getPlaylistId();
  }
  if (model.getCustomVar1()) {
    commonModel.customVar1 = model.getCustomVar1();
  }
  if (model.getCustomVar2()) {
    commonModel.customVar2 = model.getCustomVar2();
  }
  if (model.getCustomVar3()) {
    commonModel.customVar3 = model.getCustomVar3();
  }
  if (model.getPlaybackContext()) {
    commonModel.playbackContext = model.getPlaybackContext();
  }
  if (model.getApplicationVersion()) {
    commonModel.applicationVersion = model.getApplicationVersion();
  }
  const eventModel = eventObj.getEventModel(model);
  return Object.assign(eventModel, commonModel);
}
