import { KavaModel } from './kava-model';
import { KavaEvent } from './types';
import { ButtonType } from './enums/button-type';
import { ApplicationEventType } from './enums/application-event-type';
import { PageLoadType } from './enums/page-load-type';
import { PlaykitUIEvents, PluginsEvents } from './applications-events';

export function getApplicationEventsModel(eventObj: KavaEvent, model: KavaModel, innerEventPayload: any): any {
  const commonModel = {
    partnerId: model.getPartnerId(),
    entryId: model.getEntryId(),
    sessionId: model.getSessionId(),
    kalturaApplication: model.getKalturaApplication(),
    kalturaApplicationVer: model.getKalturaApplicationVersion(),
    application: model.getApplication(),
    applicationVer: model.getApplicationVersion(),
    virtualEventId: model.getVirtualEventId()
  };

  if (model.getUserId()) {
    commonModel['userId'] = model.getUserId();
  }

  const eventModel = eventObj.getEventModel(innerEventPayload);
  return Object.assign(eventModel, commonModel);
}

export const ApplicationEventsModel: { [playerEventName: string]: KavaEvent } = {
  [PluginsEvents.CHANGE_LAYOUT]: {
    type: 'CHANGE_LAYOUT',
    getEventModel: (payload: any): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      buttonName: 'Dual__screen_change_layout',
      buttonType: ButtonType.Choose,
      buttonValue: payload.layout
    })
  },
  [PluginsEvents.SHARE_CLICKED]: {
    type: 'SHARE_CLICKED',
    getEventModel: (): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      buttonName: 'Share_embed_open',
      buttonType: ButtonType.Open,
      buttonValue: ''
    })
  },
  [PluginsEvents.SHARE_CLOSE]: {
    type: 'SHARE_CLOSE',
    getEventModel: (): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      buttonName: 'Share_embed_close',
      buttonType: ButtonType.Close,
      buttonValue: ''
    })
  },
  [PluginsEvents.SHARE_NETWORK]: {
    type: 'SHARE_NETWORK',
    getEventModel: (payload: any): any => {
      const model = {
        eventType: ApplicationEventType.BUTTON_CLICKED,
        buttonType: ButtonType.Share,
        buttonValue: ''
      };
      let buttonName: string = '';

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
        case 'embed':
          buttonName = 'Share_embed_embed_click';
          break;
      }

      return { ...model, buttonName };
    }
  },
  [PluginsEvents.SHARE_COPY]: {
    type: 'SHARE_COPY',
    getEventModel: (payload: any): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      buttonName: 'Share_embed_copy_click',
      buttonType: ButtonType.Share,
      buttonValue: payload['videoClippingOption'] === 'full' ? 'full-length' : payload['videoClippingOption']
    })
  },
  [PluginsEvents.DOWNLOAD_ITEM_CLICKED]: {
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
  [PluginsEvents.SHOW_OVERLAY]: {
    type: 'SHOW_OVERLAY',
    getEventModel: (): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      buttonName: 'Download_open',
      buttonType: ButtonType.Open,
      buttonValue: ''
    })
  },
  [PluginsEvents.HIDE_OVERLAY]: {
    type: 'HIDE_OVERLAY',
    getEventModel: (): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      buttonName: 'Download_close',
      buttonType: ButtonType.Close,
      buttonValue: ''
    })
  },
  [PluginsEvents.BUMPER_CLICKED]: {
    type: 'BUMPER_CLICKED',
    getEventModel: (): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      buttonName: 'Bumper_click',
      buttonType: ButtonType.Link,
      buttonValue: ''
    })
  },
  [PluginsEvents.NAVIGATION_OPEN]: {
    type: 'NAVIGATION_OPEN',
    getEventModel: (payload: any): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      buttonName: 'Navigation_open',
      buttonType: ButtonType.Open,
      buttonValue: payload['auto'] ? 'auto' : 'manual'
    })
  },
  [PluginsEvents.NAVIGATION_CLOSE]: {
    type: 'NAVIGATION_CLOSE',
    getEventModel: (): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      buttonName: 'Navigation_close',
      buttonType: ButtonType.Close,
      buttonValue: ''
    })
  },
  [PluginsEvents.NAVIGATION_SEARCH]: {
    type: 'NAVIGATION_SEARCH',
    getEventModel: (payload: any): any => {
      const model = {
        eventType: ApplicationEventType.BUTTON_CLICKED,
        buttonType: ButtonType.Search
      };

      const { searchQuery, activeTab, availableTabs } = payload;

      let buttonName: string = '';
      const buttonValue = searchQuery;
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
  [PluginsEvents.NAVIGATION_ITEM_CLICK]: {
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
  [PluginsEvents.NAVIGATION_EXPANDABLE_TEXT_CLICK]: {
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

  [PluginsEvents.TRANSCRIPT_OPEN]: {
    type: 'TRANSCRIPT_OPEN',
    getEventModel: (payload: any): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      buttonName: 'Transcript_open',
      buttonType: ButtonType.Open,
      buttonValue: payload['auto'] ? 'auto' : 'manual'
    })
  },
  [PluginsEvents.TRANSCRIPT_CLOSE]: {
    type: 'TRANSCRIPT_CLOSE',
    getEventModel: (): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      buttonName: 'Transcript_close',
      buttonType: ButtonType.Close,
      buttonValue: ''
    })
  },
  [PluginsEvents.TRANSCRIPT_DOWNLOAD]: {
    type: 'TRANSCRIPT_DOWNLOAD',
    getEventModel: (payload: any): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      buttonName: 'Transcript_download',
      buttonType: ButtonType.Download,
      buttonValue: payload['videoPosition']
    })
  },
  [PluginsEvents.TRANSCRIPT_PRINT]: {
    type: 'TRANSCRIPT_PRINT',
    getEventModel: (payload: any): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      buttonName: 'Transcript_print',
      buttonType: ButtonType.Download,
      buttonValue: payload['videoPosition']
    })
  },
  [PluginsEvents.TRANSCRIPT_SEARCH]: {
    type: 'TRANSCRIPT_SEARCH',
    getEventModel: (payload: any): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      buttonName: 'Transcript_search',
      buttonType: ButtonType.Search,
      buttonValue: payload.search
    })
  },
  [PluginsEvents.TRANSCRIPT_NAVIGATE_RESULT]: {
    type: 'TRANSCRIPT_NAVIGATE_RESULT',
    getEventModel: (payload: any): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      buttonName: 'Transcript_navigate_result',
      buttonType: ButtonType.Navigate,
      buttonValue: payload.index
    })
  },
  [PluginsEvents.PLAYLIST_OPEN]: {
    type: 'PLAYLIST_OPEN',
    getEventModel: (payload: any): any => ({
      eventType: payload['auto'] ? ApplicationEventType.PAGE_LOAD : ApplicationEventType.BUTTON_CLICKED,
      buttonValue: payload['position'],
      buttonType: ButtonType.Open,
      buttonName: payload['auto'] ? 'Playlist_side_panel_open_auto' : 'Playlist_side_panel_open_manual'
    })
  },
  [PluginsEvents.PLAYLIST_CLOSE]: {
    type: 'PLAYLIST_CLOSE',
    getEventModel: (payload: any): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      buttonValue: payload['position'],
      buttonType: ButtonType.Close,
      buttonName: 'Playlist_side_panel_close_manual'
    })
  },
  [PluginsEvents.SKIP_BUTTON_CLICK]: {
    type: 'SKIP_BUTTON_CLICK',
    getEventModel: (payload: any): any => {
      const model = {
        eventType: ApplicationEventType.BUTTON_CLICKED,
        buttonType: ButtonType.Navigate,
        buttonValue: ''
      };

      const { mode } = payload;
      let buttonName: string = '';

      if (mode === 'intro') buttonName = 'Skip_intro_click';
      if (mode === 'outro') buttonName = 'Skip_outro_click';

      return { ...model, buttonName };
    }
  },
  [PluginsEvents.SKIP_BUTTON_DISPLAYED]: {
    type: 'SKIP_BUTTON_DISPLAYED',
    getEventModel: (payload: any): any => {
      const model = {
        eventType: ApplicationEventType.PAGE_LOAD,
        buttonType: PageLoadType.View,
        buttonValue: ''
      };

      const { mode } = payload;
      let buttonName: string = '';

      if (mode === 'intro') buttonName = 'Skip_intro_displayed';
      if (mode === 'outro') buttonName = 'Skip_outro_displayed';

      return { ...model, buttonName };
    }
  },
  [PluginsEvents.RELATED_OPEN]: {
    type: 'RELATED_OPEN',
    getEventModel: (payload: any): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      buttonName: 'Related_open_manual',
      buttonType: ButtonType.Open,
      buttonValue: payload['expandMode']
    })
  },
  [PluginsEvents.RELATED_CLOSE]: {
    type: 'RELATED_CLOSE',
    getEventModel: (): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      buttonName: 'Related_close',
      buttonType: ButtonType.Close,
      buttonValue: ''
    })
  },
  [PluginsEvents.RELATED_ENTRY_SELECTED]: {
    type: 'RELATED_ENTRY_SELECTED',
    getEventModel: (): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      buttonName: 'Related_entry_click',
      buttonType: ButtonType.Navigate,
      buttonValue: ''
    })
  },
  [PluginsEvents.RELATED_ENTRY_AUTO_PLAYED]: {
    type: 'RELATED_ENTRY_AUTO_PLAYED',
    getEventModel: (): any => ({
      eventType: ApplicationEventType.PAGE_LOAD,
      buttonName: 'Related_entry_auto_continue',
      buttonType: PageLoadType.View,
      buttonValue: ''
    })
  },
  [PluginsEvents.RELATED_GRID_DISPLAYED]: {
    type: 'RELATED_GRID_DISPLAYED',
    getEventModel: (): any => ({
      eventType: ApplicationEventType.PAGE_LOAD,
      buttonName: 'Related_open_auto',
      buttonType: PageLoadType.View,
      buttonValue: ''
    })
  },
  [PluginsEvents.CALL_TO_ACTION_BUTTON_CLICK]: {
    type: 'CALL_TO_ACTION_BUTTON_CLICK',
    getEventModel: (payload: any): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      buttonValue: payload['label'],
      buttonType: ButtonType.Link,
      buttonName: payload['type'] === 'primary' ? 'CTA_primary_button_click' : 'CTA_secondary_button_click'
    })
  },
  [PluginsEvents.HOTSPOT_DISPLAYED]: {
    type: 'HOTSPOT_DISPLAYED',
    getEventModel: (payload: any): any => ({
      eventType: ApplicationEventType.PAGE_LOAD,
      buttonName: 'Hotspot_displayed',
      buttonType: PageLoadType.View,
      buttonValue: payload['label']
    })
  },
  [PluginsEvents.HOTSPOT_CLICK]: {
    type: 'HOTSPOT_CLICK',
    getEventModel: (payload: any): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      buttonName: 'Hotspot_click',
      buttonType: ButtonType.Link,
      buttonValue: payload['label']
    })
  },
  [PluginsEvents.QUIZ_STARTED]: {
    type: 'QUIZ_STARTED',
    getEventModel: (): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      buttonName: 'Quiz_start',
      buttonType: ButtonType.Load,
      buttonValue: ''
    })
  },
  [PluginsEvents.QUIZ_SUBMITTED]: {
    type: 'QUIZ_SUBMITTED',
    getEventModel: (): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      buttonName: 'Quiz_submit',
      buttonType: ButtonType.Send,
      buttonValue: ''
    })
  },
  [PluginsEvents.QUIZ_SKIPPED]: {
    type: 'QUIZ_SKIPPED',
    getEventModel: (payload: any): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      buttonName: 'Quiz_skip_question',
      buttonType: ButtonType.Navigate,
      buttonValue: payload['id']
    })
  },
  [PluginsEvents.QUIZ_SEEK]: {
    type: 'QUIZ_SEEK',
    getEventModel: (): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      buttonName: 'Quiz_nav_click',
      buttonType: ButtonType.Navigate,
      buttonValue: ''
    })
  },
  [PlaykitUIEvents.USER_CLICKED_LOGO]: {
    type: 'USER_CLICKED_LOGO',
    getEventModel: (payload: any): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      buttonName: 'Logo_click',
      buttonType: ButtonType.Link,
      buttonValue: payload['logoUrl']
    })
  }
};
