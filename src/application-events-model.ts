import { DownloadEvents, DualscreenEvents, ShareEvents } from './new-applications-events';
import { KavaModel } from './kava-model';
import { KavaEvent } from './types';
import { ButtonType } from './enums/button-type';
import { KalturaApplication } from './enums/kaltura-application';

const EVENT_TYPE_BUTTON_CLICK = 10002;

export function getApplicationEventsModel(eventObj: KavaEvent, model: KavaModel, innerEventPayload: any): any {
  const commonModel = {
    eventType: EVENT_TYPE_BUTTON_CLICK,
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
      buttonName: 'Dual__screen_change_layout',
      buttonType: ButtonType.Unknown,
      buttonValue: payload.layout
    })
  },
  [ShareEvents.SHARE_CLICKED]: {
    type: 'SHARE_CLICKED',
    getEventModel: (): any => ({
      buttonName: 'Share_embed_open',
      buttonType: ButtonType.Open,
      buttonValue: ''
    })
  },
  [ShareEvents.SHARE_CLOSE]: {
    type: 'SHARE_CLOSE',
    getEventModel: (): any => ({
      buttonName: 'Share_embed_close',
      buttonType: ButtonType.Close,
      buttonValue: ''
    })
  },
  [ShareEvents.SHARE_NETWORK]: {
    type: 'SHARE_NETWORK',
    getEventModel: (payload: any): any => {
      const model = {
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
      buttonName: 'Share_embed_X_click',
      buttonType: ButtonType.Share,
      buttonValue: payload.videoClippingOption
    })
  },
  [DownloadEvents.DOWNLOAD_ITEM_CLICKED]: {
    type: 'DOWNLOAD_ITEM_CLICKED',
    getEventModel: (payload: any): any => {
      const model = {
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
      buttonName: 'Download_open',
      buttonType: ButtonType.Open,
      buttonValue: ''
    })
  },
  [DownloadEvents.HIDE_OVERLAY]: {
    type: 'HIDE_OVERLAY',
    getEventModel: (): any => ({
      buttonName: 'Download_close',
      buttonType: ButtonType.Close,
      buttonValue: ''
    })
  }
};
