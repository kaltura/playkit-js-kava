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
  [ShareEvents.SHARE_CLICKED]: {
    getEventModel: (payload: any): any => ({
      buttonName: 'Share_embed_open',
      buttonType: ButtonType.Open,
      buttonValue: payload.layout,
    })
  },
  [ShareEvents.SHARE_CLOSE]: {
    getEventModel: (payload: any): any => ({
      buttonName: 'Share_embed_close',
      buttonType: ButtonType.Close,
      buttonValue: payload.layout,
    })
  },
  [ShareEvents.SHARE_NETWORK]: {
    getEventModel: (payload: any): any => {
      const model = {
        buttonType: ButtonType.Share,
        buttonValue: '',
      }
      let buttonName: string;

      switch (payload.socialNetworkName) {
      case "twitter":
        buttonName = 'Share_embed_X_click'
        break;
      case "facebook":
        buttonName = 'Share_embed_facebook_click'
        break;
      case "email":
        buttonName = 'Share_embed_email_click'
        break;
      case "linkedin":
        buttonName = 'Share_embed_linkedin_click'
        break;
      default:
        buttonName = 'unknown'
      }

      return {...model, buttonName}
    }
  },
  [ShareEvents.SHARE_COPY]: {
    getEventModel: (payload: any): any => ({
      buttonName: 'Share_embed_X_click',
      buttonType: ButtonType.Share,
      buttonValue: payload.layout,
    })
  },
  [DownloadEvents.DOWNLOAD_ITEM_CLICKED]: {
    getEventModel: (payload: any): any => {
      const model = {
        buttonType: ButtonType.Download,
      }
      const {assetType, fileType, description} = payload;

      let buttonName: string;
      let buttonValue = description;

      switch (assetType) {
      case "Media":
        buttonName = 'Download_video_download';
        break;
      case "Captions":
        buttonName = 'Download_captions_download';
        break;
      case "Attachments":
        buttonName = 'Download_attachment_download';
        buttonValue = fileType;
        break;
      default:
        buttonName = ''
        buttonValue = '';
      }

      return {...model, buttonName, buttonValue}
    }
  },
  [DownloadEvents.SHOW_OVERLAY]: {
    getEventModel: (payload: any): any => ({
      buttonName: 'Download_open',
      buttonType: ButtonType.Open,
      buttonValue: '',
    })
  },
  [DownloadEvents.HIDE_OVERLAY]: {
    getEventModel: (payload: any): any => ({
      buttonName: 'Download_close',
      buttonType: ButtonType.Close,
      buttonValue: '',
    })
  },
};
