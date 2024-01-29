import { KavaModel } from './kava-model';
import { KavaEvent } from './types';

/**
 * @name KavaEventType
 * @enum
 */
export const KavaEventModel = {
  /**
   * @type {string} VIEW
   * @memberof KavaEventType
   */
  VIEW: {
    type: 'VIEW',
    index: 99,
    getEventModel: (model: KavaModel) => {
      const eventModel: { [name: string]: any } = {
        playTimeSum: model.getPlayTimeSum(),
        bufferTime: model.getBufferTime(),
        bufferTimeSum: model.getBufferTimeSum(),
        actualBitrate: model.getActualBitrate(),
        averageBitrate: model.getAverageBitrate(),
        audioLanguage: model.getLanguage(),
        soundMode: model.getSoundMode(),
        tabMode: model.getTabMode(),
        viewabilityMode: model.getViewabilityMode(),
        screenMode: model.getScreenMode()
      };

      if (!isNaN(model.getForwardBufferHealth())) {
        eventModel.forwardBufferHealth = model.getForwardBufferHealth();
      }
      if (model.getMaxManifestDownloadTime() > 0) {
        eventModel.manifestDownloadTime = model.getMaxManifestDownloadTime();
      }
      if (model.getSegmentDownloadTime() > 0) {
        eventModel.segmentDownloadTime = model.getSegmentDownloadTime();
      }
      if (model.getBandwidth()) {
        eventModel.bandwidth = model.getBandwidth();
      }
      if (model.getDroppedFramesRatio() != null) {
        eventModel.droppedFramesRatio = model.getDroppedFramesRatio();
      }

      if (!isNaN(model.getTargetBuffer())) {
        eventModel.targetBuffer = model.getTargetBuffer();
      }

      if (model.getNetworkConnectionType() !== '') {
        eventModel.networkConnectionType = model.getNetworkConnectionType();
      }

      if (model.getNetworkConnectionOverhead()) {
        eventModel.networkConnectionOverhead = model.getNetworkConnectionOverhead();
      }
      if (!isNaN(model.getFlavorParamsId())) {
        eventModel.flavorParamsId = model.getFlavorParamsId();
      }

      return eventModel;
    }
  },
  /**
   * @type {string} IMPRESSION
   * @memberof KavaEventType
   */
  IMPRESSION: {
    type: 'IMPRESSION',
    index: 1,
    getEventModel: (model: KavaModel) => {
      const eventModel = {} as KavaModel;
      if (model.getPlayerJSLoadTime() != null) {
        eventModel.playerJSLoadTime = model.getPlayerJSLoadTime();
      }
      return eventModel;
    }
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
    getEventModel: (model: KavaModel) => {
      const eventModel: { [name: string]: any } = {
        bufferTime: model.getBufferTime(),
        bufferTimeSum: model.getBufferTimeSum(),
        actualBitrate: model.getActualBitrate(),
        joinTime: model.getJoinTime(),
        canPlay: model.getCanPlayTime()
      };
      if (model.getNetworkConnectionType() !== '') {
        eventModel.networkConnectionType = model.getNetworkConnectionType();
      }
      return eventModel;
    }
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
   * @type {string} SPEED
   * @memberof KavaEventType
   */
  SPEED: {
    type: 'SPEED',
    index: 41,
    getEventModel: () => ({})
  },
  /**
   * @type {string} CAPTIONS
   * @memberof KavaEventType
   */
  CAPTIONS: {
    type: 'CAPTIONS',
    index: 38,
    getEventModel: () => ({})
  },
  /**
   * @type {string} ERROR
   * @memberof KavaEventType
   */
  ERROR: {
    type: 'ERROR',
    index: 98,
    getEventModel: (model: KavaModel) => ({
      errorCode: model.getErrorCode(),
      errorDetails: model.getErrorDetails(),
      errorPosition: model.getErrorPosition()
    })
  },
  /**
   * @type {string} RELATED_CLICKED
   * @memberof KavaEventType
   */
  RELATED_CLICKED: {
    type: 'RELATED_CLICKED',
    index: 36,
    getEventModel: () => ({})
  },
  /**
   * @type {string} RELATED_SELECTED
   * @memberof KavaEventType
   */
  RELATED_SELECTED: {
    type: 'RELATED_SELECTED',
    index: 37,
    getEventModel: () => ({})
  },
  /**
   * @type {string} SHARE_CLICKED
   * @memberof KavaEventType
   */
  SHARE_CLICKED: {
    type: 'SHARE_CLICKED',
    index: 21,
    getEventModel: () => ({})
  },
  /**
   * @type {string} SHARE_NETWORK
   * @memberof KavaEventType
   */
  SHARE_NETWORK: {
    type: 'SHARE_NETWORK',
    index: 22,
    getEventModel: (model: KavaModel) => ({
      socialNetwork: model.getShareNetworkName()
    })
  },
  ENTER_FULLSCREEN: {
    type: 'ENTER_FULLSCREEN',
    index: 31,
    getEventModel: (model: KavaModel) => ({
      screenMode: model.getScreenMode()
    })
  },
  EXIT_FULLSCREEN: {
    type: 'EXIT_FULLSCREEN',
    index: 32,
    getEventModel: (model: KavaModel) => ({
      screenMode: model.getScreenMode()
    })
  },
  DOWNLOAD: {
    type: 'DOWNLOAD',
    index: 23,
    getEventModel: () => ({})
  },
  REPORT_CLICKED: {
    type: 'REPORT_CLICKED',
    index: 24,
    getEventModel: () => ({})
  },
  REPORT_SUBMITTED: {
    type: 'REPORT_SUBMITTED',
    index: 25,
    getEventModel: (model: KavaModel) => ({
      reportType: model.getReportType()
    })
  },
  INFO: {
    type: 'INFO',
    index: 40,
    getEventModel: () => ({})
  }
};

export const KavaEventType: { [event: string]: string } = ((eventType) => {
  Object.keys(KavaEventModel).forEach((k) => (eventType[k] = k));
  return eventType;
})({});
//
// /**
//  * Gets the full event model for a certain event object including the common params.
//  * @private
//  * @param {KavaEvent} eventObj - The event model.
//  * @param {KavaModel} model - The plugin model store.
//  * @returns {Object} - The full event model.
//  */
export function getEventModel(eventObj: KavaEvent, model: KavaModel): any {
  const commonModel: any = {
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
    position: model.getPosition(),
    playbackSpeed: model.getPlaybackSpeed()
  };

  if (model.getCaption()) {
    commonModel.caption = model.getCaption();
  }
  if (model.getSessionStartTime()) {
    commonModel.sessionStartTime = model.getSessionStartTime();
  }
  if (model.getKS()) {
    commonModel.ks = model.getKS();
  }
  if (model.getVirtualEventId()) {
    commonModel.virtualEventId = model.getVirtualEventId();
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
    commonModel.applicationVer = model.getApplicationVersion();
  }
  if (model.getApplication()) {
    commonModel.application = model.getApplication();
  }
  if (model.getKalturaApplicationVersion()) {
    commonModel.kalturaApplicationVer = model.getKalturaApplicationVersion();
  }
  if (model.getKalturaApplication()) {
    commonModel.kalturaApplication = model.getKalturaApplication();
  }
  if (model.getUserId()) {
    commonModel.userId = model.getUserId();
  }
  if (model.getPersistentSessionId()) {
    commonModel.persistentSessionId = model.getPersistentSessionId();
  }
  const eventModel = eventObj.getEventModel(model);
  return Object.assign(eventModel, commonModel);
}