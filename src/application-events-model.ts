import {
  BumperEvents,
  DownloadEvents,
  DualscreenEvents,
  NavigationEvents,
  PlaylistEvents,
  ShareEvents,
  TranscriptEvents
} from './new-applications-events';
import { KavaModel } from './kava-model';
import { KavaEvent } from './types';
import { ButtonType } from './enums/button-type';
import { KalturaApplication } from './enums/kaltura-application';
import { ApplicationEventType } from './enums/application-event-type';

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
  },
  [BumperEvents.BUMPER_CLICKED]: {
    type: 'BUMPER_CLICKED',
    getEventModel: (): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      buttonName: 'Bumper_click',
      buttonType: ButtonType.Link,
      buttonValue: ''
    })
  },
  [NavigationEvents.NAVIGATION_OPEN]: {
    type: 'NAVIGATION_OPEN',
    getEventModel: (payload: any): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      buttonName: 'Navigation_open',
      buttonType: ButtonType.Open,
      buttonValue: payload['auto'] ? 'auto' : 'manual'
    })
  },
  [NavigationEvents.NAVIGATION_CLOSE]: {
    type: 'NAVIGATION_CLOSE',
    getEventModel: (): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      buttonName: 'Navigation_close',
      buttonType: ButtonType.Close,
      buttonValue: ''
    })
  },
  [NavigationEvents.NAVIGATION_SEARCH]: {
    type: 'NAVIGATION_SEARCH',
    getEventModel: (payload: any): any => {
      const model = {
        eventType: ApplicationEventType.BUTTON_CLICKED,
        buttonType: ButtonType.Search
      };
      //navigation_search {"searchQuery":"ddd","activeTab":"All","availableTabs":["Slide"],"totalResults":0}  #@#@#
      const { searchQuery, activeTab, availableTabs } = payload;

      let buttonName: string = '';
      let buttonValue = searchQuery;
      switch (activeTab) {
        case 'All':
          buttonName = availableTabs.length > 0 ? 'Navigation_search' : 'Navigation_all_tab';
          break;
        case 'Chapter':
          buttonName = 'Navigation_chapters_tab';
          break;
        case 'Slide':
          buttonName = 'Navigation_slides_tab';
          break;
        case 'Hotspot':
          buttonName = 'Navigation_hotspots_tab';
          break;
      }
      return { ...model, buttonName, buttonValue };
    }
  },
  [NavigationEvents.NAVIGATION_ITEM_CLICK]: {
    type: 'NAVIGATION_ITEM_CLICK',
    getEventModel: (payload: any): any => {
      const model = {
        eventType: ApplicationEventType.BUTTON_CLICKED,
        buttonType: ButtonType.Choose,
        buttonValue: ''
      };

      let buttonName: string = '';

      switch (payload.itemType) {
        case 'Chapter':
          buttonName = 'Navigation_chapter_click';
          break;
        case 'Slide':
          buttonName = 'Navigation_slide_click';
          break;
        case 'Hotspot':
          buttonName = 'Navigation_hotspots_click';
          break;
      }
      return { ...model, buttonName };
    }
  },
  [NavigationEvents.NAVIGATION_EXPANDABLE_TEXT_CLICK]: {
    type: 'NAVIGATION_EXPANDABLE_TEXT_CLICK',
    getEventModel: (payload: any): any => {
      const model = {
        eventType: ApplicationEventType.BUTTON_CLICKED,
        buttonValue: ''
      };

      const { isTextExpanded, itemType } = payload;

      let buttonName: string = '';
      const buttonType = isTextExpanded ? ButtonType.Expand : ButtonType.Collapse;

      switch (itemType) {
        case 'Chapter':
          buttonName = isTextExpanded ? 'Navigation_chapters_see_more' : 'Navigation_chapters_see_less';
          break;
        case 'Slide':
          buttonName = isTextExpanded ? 'Navigation_slides_see_more' : 'Navigation_slides_see_less';
          break;
        case 'Hotspot':
          buttonName = isTextExpanded ? 'Navigation_hotspots_see_more' : 'Navigation_hotspots_see_less';
          break;
      }

      return { ...model, buttonName, buttonType };
    }
  },

  [TranscriptEvents.TRANSCRIPT_OPEN]: {
    type: 'TRANSCRIPT_OPEN',
    getEventModel: (payload: any): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      buttonName: 'Transcript_open',
      buttonType: ButtonType.Open,
      buttonValue: payload['auto'] ? 'auto' : 'manual'
    })
  },
  [TranscriptEvents.TRANSCRIPT_CLOSE]: {
    type: 'TRANSCRIPT_CLOSE',
    getEventModel: (payload: any): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      buttonName: 'Transcript_close',
      buttonType: ButtonType.Close,
      buttonValue: ''
    })
  },
  [TranscriptEvents.TRANSCRIPT_DOWNLOAD]: {
    type: 'TRANSCRIPT_DOWNLOAD',
    getEventModel: (payload: any): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      buttonName: 'Transcript_download',
      buttonType: ButtonType.Download,
      buttonValue: payload['videoPosition']
    })
  },
  [TranscriptEvents.TRANSCRIPT_PRINT]: {
    type: 'TRANSCRIPT_PRINT',
    getEventModel: (payload: any): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      buttonName: 'Transcript_print',
      buttonType: ButtonType.Download,
      buttonValue: payload['videoPosition']
    })
  },
  [TranscriptEvents.TRANSCRIPT_SEARCH]: {
    type: 'TRANSCRIPT_SEARCH',
    getEventModel: (payload: any): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      buttonName: 'Transcript_search',
      buttonType: ButtonType.Search,
      buttonValue: payload.search
    })
  },
  [TranscriptEvents.TRANSCRIPT_NAVIGATE_RESULT]: {
    type: 'TRANSCRIPT_NAVIGATE_RESULT',
    getEventModel: (payload: any): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      buttonName: 'Transcript_navigate_result',
      buttonType: ButtonType.Navigate,
      buttonValue: payload.index
    })
  },
  [PlaylistEvents.PLAYLIST_OPEN]: {
    type: 'TRANSCRIPT_OPEN',
    getEventModel: (payload: any): any => {
      const model = {
        eventType: ApplicationEventType.BUTTON_CLICKED,
        buttonValue: payload['auto'] ? 'auto' : 'manual',
        buttonType: ButtonType.Open
      };

      const { position } = payload;
      let buttonName: string = '';

      switch (position) {
        case 'right':
          buttonName = 'Playlist_side_panel_open_right';
          break;
        case 'left':
          buttonName = 'Playlist_side_panel_open_left';
          break;
        case 'top':
          buttonName = 'Playlist_side_panel_open_top';
          break;
        case 'bottom':
          buttonName = 'Playlist_side_panel_open_bottom';
          break;
      }

      return { ...model, buttonName };
    }
  },
  [PlaylistEvents.PLAYLIST_CLOSE]: {
    type: 'TRANSCRIPT_CLOSE',
    getEventModel: (payload: any): any => {
      const model = {
        eventType: ApplicationEventType.BUTTON_CLICKED,
        buttonType: ButtonType.Close,
        buttonValue: ''
      };

      const { position } = payload;
      let buttonName: string = '';

      switch (position) {
        case 'right':
          buttonName = 'Playlist_side_panel_close_right';
          break;
        case 'left':
          buttonName = 'Playlist_side_panel_close_left';
          break;
        case 'top':
          buttonName = 'Playlist_side_panel_close_top';
          break;
        case 'bottom':
          buttonName = 'Playlist_side_panel_close_bottom';
          break;
      }
      return { ...model, buttonName };
    }
  }
};
