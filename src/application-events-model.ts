import { DownloadEvents, DualscreenEvents, ShareEvents } from "./new-applications-events";
import { KavaModel } from "./kava-model";
import { KavaEvent } from "./types";
import { ButtonType } from "./enums/button-type";

const EVENT_TYPE_BUTTON_CLICK = 10002;

function getApplicationEventsModel(eventObj: KavaEvent, model: KavaModel, innerEventPayload: any): any {
  const commonModel = {
    eventType: EVENT_TYPE_BUTTON_CLICK,
    partnerId: model.getPartnerId(),
    entryId: model.getEntryId(),
    sessionId: model.getSessionId(),
  }
  if (model.getUserId()) {
    commonModel['userId'] = model.getUserId();
  }
  const eventModel = eventObj.getEventModel(innerEventPayload);
  return Object.assign(eventModel, commonModel);
}


export const ApplicationEventsModel = {
  [DualscreenEvents.CHANGE_LAYOUT]: {
    getEventModel: (payload: any): any => ({
      buttonName: 'Dual__screen_change_layout',
      buttonType: ButtonType.Unknown,
      buttonValue: payload.layout,
    })
  },
  [ShareEvents.SHARE_CLICKED]: {},
  [ShareEvents.SHARE_CLOSE]: {},
  [ShareEvents.SHARE_NETWORK]: {},
  [ShareEvents.SHARE_COPY]: {},
  [DownloadEvents.DOWNLOAD_ITEM_CLICKED]: {},
  [DownloadEvents.SHOW_OVERLAY]: {},
  [DownloadEvents.HIDE_OVERLAY]: {},
};
