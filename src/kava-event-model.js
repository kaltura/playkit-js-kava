// @flow
import KavaModel from './kava-model'

export const KavaEventModel: { [event: string]: KavaEvent } = {
  VIEW: {
    type: "VIEW",
    index: 99,
    getEventModel: (model: KavaModel) => ({
      playTimeSum: model.getPlayTimeSum(),
      bufferTime: model.getBufferTime(),
      bufferTimeSum: model.getBufferTimeSum(),
      actualBitrate: model.getActualBitrate(),
      averageBitrate: model.getAverageBitrate()
    })
  },
  IMPRESSION: {
    type: "IMPRESSION",
    index: 1,
    getEventModel: () => ({})
  },
  PLAY_REQUEST: {
    type: "PLAY_REQUEST",
    index: 2,
    getEventModel: () => ({})
  },
  PLAY: {
    type: "PLAY",
    index: 3,
    getEventModel: (model: KavaModel) => ({
      bufferTime: model.getBufferTime(),
      bufferTimeSum: model.getBufferTimeSum(),
      actualBitrate: model.getActualBitrate(),
      joinTime: model.getJoinTime()
    })
  },
  RESUME: {
    type: "RESUME",
    index: 4,
    getEventModel: (model: KavaModel) => ({
      bufferTime: model.getBufferTime(),
      bufferTimeSum: model.getBufferTimeSum(),
      actualBitrate: model.getActualBitrate()
    })
  },
  PAUSE: {
    type: "PAUSE",
    index: 33,
    getEventModel: () => ({})
  },
  REPLAY: {
    type: "REPLAY",
    index: 34,
    getEventModel: () => ({})
  },
  SEEK: {
    type: "SEEK",
    index: 35,
    getEventModel: (model: KavaModel) => ({
      targetPosition: model.getTargetPosition()
    })
  },
  PLAY_REACHED_25_PERCENT: {
    type: "PLAY_REACHED_25_PERCENT",
    index: 11,
    getEventModel: () => ({})
  },
  PLAY_REACHED_50_PERCENT: {
    type: "PLAY_REACHED_50_PERCENT",
    index: 12,
    getEventModel: () => ({})
  },
  PLAY_REACHED_75_PERCENT: {
    type: "PLAY_REACHED_75_PERCENT",
    index: 13,
    getEventModel: () => ({})
  },
  PLAY_REACHED_100_PERCENT: {
    type: "PLAY_REACHED_100_PERCENT",
    index: 14,
    getEventModel: () => ({})
  },
  SOURCE_SELECTED: {
    type: "SOURCE_SELECTED",
    index: 39,
    getEventModel: (model: KavaModel) => ({
      actualBitrate: model.getActualBitrate()
    })
  },
  AUDIO_SELECTED: {
    type: "AUDIO_SELECTED",
    index: 42,
    getEventModel: (model: KavaModel) => ({
      language: model.getLanguage()
    })
  },
  FLAVOR_SWITCH: {
    type: "FLAVOR_SWITCH",
    index: 43,
    getEventModel: (model: KavaModel) => ({
      actualBitrate: model.getActualBitrate()
    })
  },
  CAPTIONS: {
    type: "CAPTIONS",
    index: 38,
    getEventModel: (model: KavaModel) => ({
      caption: model.getCaption()
    })
  },
  ERROR: {
    type: "ERROR",
    index: 98,
    getEventModel: (model: KavaModel) => ({
      errorCode: model.getErrorCode()
    })
  },
  getEventModel: (eventObj: KavaEvent, model: KavaModel) => {
    const commonModel = {
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
    if (model.getCustomVar1()) {
      commonModel.customVar1 = model.getCustomVar1();
    }
    if (model.getCustomVar2()) {
      commonModel.customVar2 = model.getCustomVar2();
    }
    if (model.getCustomVar3()) {
      commonModel.customVar3 = model.getCustomVar3();
    }
    const eventModel = eventObj.getEventModel(model);
    return Object.assign(eventModel, commonModel);
  }
};
