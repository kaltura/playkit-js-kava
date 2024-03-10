import { DownloadEvents, DualscreenEvents, ShareEvents } from './new-applications-events';
import { KavaModel } from './kava-model';
import { KavaEvent } from './types';
import { ButtonType } from './enums/button-type';
import { KalturaApplication } from './enums/kaltura-application';
import { ApplicationEventType } from "./enums/application-event-type";

export function getApplicationEventsModel(eventObj: KavaEvent, model: KavaModel, innerEventPayload: any): any {
  const commonModel = {
    partnerId: model.getPartnerId(),
    entryId: model.getEntryId(),
    sessionId: model.getSessionId(),
    kalturaApplication: KalturaApplication.PLAYER
  };
  if (model.getUserId()) {
    commonModel['userId'] = model.getUserId();
  }
  const eventModel = eventObj.getEventModel(innerEventPayload);
  return Object.assign(eventModel, commonModel);
}

export const ApplicationEventsModel: { [playerEventName: string]: KavaEvent } = {
  [DualscreenEvents.CHANGE_LAYOUT]: {
    type: 'CHANGE_LAYOUT',
    getEventModel: (payload: any): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      buttonName: 'Dual__screen_change_layout',
      buttonType: ButtonType.Unknown,
      buttonValue: payload.layout
    })
  },
  [ShareEvents.SHARE_CLICKED]: {
    type: 'SHARE_CLICKED',
    getEventModel: (): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      buttonName: 'Share_embed_open',
      buttonType: ButtonType.Open,
      buttonValue: ''
    })
  },
  [ShareEvents.SHARE_CLOSE]: {
    type: 'SHARE_CLOSE',
    getEventModel: (): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      buttonName: 'Share_embed_close',
      buttonType: ButtonType.Close,
      buttonValue: ''
    })
  },
  [ShareEvents.SHARE_NETWORK]: {
    type: 'SHARE_NETWORK',
    getEventModel: (payload: any): any => {
      const model = {
        eventType: ApplicationEventType.BUTTON_CLICKED,
        buttonType: ButtonType.Share,
        buttonValue: ''
      };
      let buttonName: string;

      switch (payload.socialNetworkName) {
        case 'twitter':
          buttonName = 'Share_embed_X_click';
          break;
        case 'facebook':
          buttonName = 'Share_embed_facebook_click';
          break;
        case 'email':
          buttonName = 'Share_embed_email_click';
          break;
        case 'linkedin':
          buttonName = 'Share_embed_linkedin_click';
          break;
        default:
          buttonName = 'unknown';
      }

      return { ...model, buttonName };
    }
  },
  [ShareEvents.SHARE_COPY]: {
    type: 'SHARE_COPY',
    getEventModel: (payload: any): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      buttonName: 'Share_embed_X_click',
      buttonType: ButtonType.Share,
      buttonValue: payload.videoClippingOption
    })
  },
  [DownloadEvents.DOWNLOAD_ITEM_CLICKED]: {
    type: 'DOWNLOAD_ITEM_CLICKED',
    getEventModel: (payload: any): any => {
      const model = {
        eventType: ApplicationEventType.BUTTON_CLICKED,
        buttonType: ButtonType.Download
      };
      const { assetType, fileType, description } = payload;

      let buttonName: string;
      let buttonValue = description;

      switch (assetType) {
        case 'Media':
          buttonName = 'Download_video_download';
          break;
        case 'Captions':
          buttonName = 'Download_captions_download';
          break;
        case 'Attachments':
          buttonName = 'Download_attachment_download';
          buttonValue = fileType;
          break;
        default:
          buttonName = '';
          buttonValue = '';
      }
      return { ...model, buttonName, buttonValue };
    }
  },
  [DownloadEvents.SHOW_OVERLAY]: {
    type: 'SHOW_OVERLAY',
    getEventModel: (): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      buttonName: 'Download_open',
      buttonType: ButtonType.Open,
      buttonValue: ''
    })
  },
  [DownloadEvents.HIDE_OVERLAY]: {
    type: 'HIDE_OVERLAY',
    getEventModel: (): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      buttonName: 'Download_close',
      buttonType: ButtonType.Close,
      buttonValue: ''
    })
  }
};
