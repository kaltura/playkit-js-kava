import { KavaModel } from './kava-model';
import { KavaEvent } from './types';
import { ButtonType } from './enums/button-type';
import { ApplicationEventType } from './enums/application-event-type';
import { PageLoadType } from './enums/page-load-type';
import { PlaykitUIEvents, PluginsEvents } from './applications-events';
import { KalturaApplication } from './enums/kaltura-application';

export function getApplicationEventsModel(eventObj: KavaEvent, model: KavaModel, innerEventPayload: any): any {
  const commonModel = {
    partnerId: model.getPartnerId(),
    entryId: model.getEntryId(),
    sessionId: model.getSessionId(),
    kalturaApplication: KalturaApplication.PLAYER
  };

  if (model.getVirtualEventId()) {
    commonModel['virtualEventId'] = model.getVirtualEventId();
  }
  if (model.getKalturaApplication()) {
    commonModel['application'] = model.getApplication();
  }
  if (model.getApplicationVersion()) {
    commonModel['applicationVer'] = model.getApplicationVersion();
  }
  if (model.getKalturaApplicationVersion()) {
    commonModel['kalturaApplicationVer'] = model.getKalturaApplicationVersion();
  }
  if (model.getUserId()) {
    commonModel['userId'] = model.getUserId();
  }

  const eventModel = eventObj.getEventModel(innerEventPayload);
  const namedEventModel = {};
  const { eventType, eventVar1, eventVar2, eventVar3 } = eventModel;
  namedEventModel['eventType'] = eventType;

  if (eventModel.eventType === ApplicationEventType.BUTTON_CLICKED) {
    namedEventModel['buttonName'] = eventVar1;
    namedEventModel['buttonType'] = eventVar2;
    namedEventModel['buttonValue'] = eventVar3;
  } else if (eventModel.eventType === ApplicationEventType.PAGE_LOAD) {
    namedEventModel['pageName'] = eventVar1;
    namedEventModel['pageType'] = eventVar2;
    namedEventModel['pageValue'] = eventVar3;
  }
  return Object.assign(namedEventModel, commonModel);
}

export const ApplicationEventsModel: { [playerEventName: string]: KavaEvent } = {
  [PluginsEvents.CHANGE_LAYOUT]: {
    type: 'CHANGE_LAYOUT',
    getEventModel: ({ layout }: any): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      eventVar1: layout !== 'Hidden' ? 'Dual__screen_change_layout' : '',
      eventVar2: ButtonType.Choose,
      eventVar3: layout
    })
  },
  [PluginsEvents.SHARE_CLICKED]: {
    type: 'SHARE_CLICKED',
    getEventModel: (): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      eventVar1: 'Share_embed_open',
      eventVar2: ButtonType.Open,
      eventVar3: ''
    })
  },
  [PluginsEvents.SHARE_CLOSE]: {
    type: 'SHARE_CLOSE',
    getEventModel: (): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      eventVar1: 'Share_embed_close',
      eventVar2: ButtonType.Close,
      eventVar3: ''
    })
  },
  [PluginsEvents.SHARE_NETWORK]: {
    type: 'SHARE_NETWORK',
    getEventModel: (payload: any): any => {
      const model = {
        eventType: ApplicationEventType.BUTTON_CLICKED,
        eventVar2: ButtonType.Share,
        eventVar3: payload['videoClippingOption'] === 'full' ? 'full-length' : payload['videoClippingOption']
      };
      let eventVar1: string = '';

      switch (payload.socialNetworkName) {
        case 'twitter':
          eventVar1 = 'Share_embed_X_click';
          break;
        case 'facebook':
          eventVar1 = 'Share_embed_facebook_click';
          break;
        case 'email':
          eventVar1 = 'Share_embed_email_click';
          break;
        case 'linkedin':
          eventVar1 = 'Share_embed_linkedin_click';
          break;
        case 'embed':
          eventVar1 = 'Share_embed_embed_click';
          break;
      }

      return { ...model, eventVar1 };
    }
  },
  [PluginsEvents.SHARE_COPY]: {
    type: 'SHARE_COPY',
    getEventModel: (payload: any): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      eventVar1: 'Share_embed_copy_click',
      eventVar2: ButtonType.Share,
      eventVar3: payload['videoClippingOption'] === 'full' ? 'full-length' : payload['videoClippingOption']
    })
  },
  [PluginsEvents.DOWNLOAD_ITEM_CLICKED]: {
    type: 'DOWNLOAD_ITEM_CLICKED',
    getEventModel: (payload: any): any => {
      const model = {
        eventType: ApplicationEventType.BUTTON_CLICKED,
        eventVar2: ButtonType.Download
      };
      const { assetType, fileType, description } = payload;

      let eventVar1: string;
      let eventVar3: string;

      switch (assetType) {
        case 'Media':
          eventVar1 = 'Download_video_download';
          eventVar3 = fileType;
          break;
        case 'Captions':
          eventVar1 = 'Download_captions_download';
          eventVar3 = description;
          break;
        case 'Attachments':
          eventVar1 = 'Download_attachment_download';
          eventVar3 = fileType;
          break;
        default:
          eventVar1 = '';
          eventVar3 = '';
      }
      return { ...model, eventVar1, eventVar3 };
    }
  },
  [PluginsEvents.SHOW_OVERLAY]: {
    type: 'SHOW_OVERLAY',
    getEventModel: (): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      eventVar1: 'Download_open',
      eventVar2: ButtonType.Open,
      eventVar3: ''
    })
  },
  [PluginsEvents.HIDE_OVERLAY]: {
    type: 'HIDE_OVERLAY',
    getEventModel: (): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      eventVar1: 'Download_close',
      eventVar2: ButtonType.Close,
      eventVar3: ''
    })
  },
  [PluginsEvents.BUMPER_CLICKED]: {
    type: 'BUMPER_CLICKED',
    getEventModel: (payload: any): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      eventVar1: 'Bumper_click',
      eventVar2: ButtonType.Link,
      eventVar3: payload['clickThroughUrl']
    })
  },
  [PluginsEvents.NAVIGATION_OPEN]: {
    type: 'NAVIGATION_OPEN',
    getEventModel: (payload: any): any => ({
      eventType: payload['auto'] ? ApplicationEventType.PAGE_LOAD : ApplicationEventType.BUTTON_CLICKED,
      eventVar1: payload['auto'] ? 'Navigation_open_auto' : 'Navigation_open_manual',
      eventVar2: PageLoadType.View,
      eventVar3: ''
    })
  },
  [PluginsEvents.NAVIGATION_CLOSE]: {
    type: 'NAVIGATION_CLOSE',
    getEventModel: (): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      eventVar1: 'Navigation_close',
      eventVar2: ButtonType.Close,
      eventVar3: ''
    })
  },
  [PluginsEvents.NAVIGATION_SEARCH]: {
    type: 'NAVIGATION_SEARCH',
    getEventModel: (payload: any): any => {
      const model = {
        eventType: ApplicationEventType.BUTTON_CLICKED
      };

      let eventVar1: string = '';
      let eventVar2: ButtonType = ButtonType.Open;

      const { searchQuery, activeTab, availableTabs } = payload;

      const eventVar3 = searchQuery;
      switch (activeTab) {
        case 'All':
          const isItSearch = searchQuery.length > 0 || availableTabs.length === 0;
          eventVar1 = isItSearch ? 'Navigation_search' : 'Navigation_all_tab';
          eventVar2 = isItSearch ? ButtonType.Search : ButtonType.Open;
          break;
        case 'Chapter':
          eventVar1 = 'Navigation_chapters_tab';
          break;
        case 'Slide':
          eventVar1 = 'Navigation_slides_tab';
          break;
        case 'Hotspot':
          eventVar1 = 'Navigation_hotspots_tab';
          break;
      }
      return { ...model, eventVar1, eventVar2, eventVar3 };
    }
  },
  [PluginsEvents.NAVIGATION_ITEM_CLICK]: {
    type: 'NAVIGATION_ITEM_CLICK',
    getEventModel: (payload: any): any => {
      const model = {
        eventType: ApplicationEventType.BUTTON_CLICKED,
        eventVar2: ButtonType.Choose,
        eventVar3: ''
      };

      let eventVar1: string = '';

      switch (payload.itemType) {
        case 'Chapter':
          eventVar1 = 'Navigation_chapter_click';
          break;
        case 'Slide':
          eventVar1 = 'Navigation_slide_click';
          break;
        case 'Hotspot':
          eventVar1 = 'Navigation_hotspots_click';
          break;
      }
      return { ...model, eventVar1 };
    }
  },
  [PluginsEvents.NAVIGATION_EXPANDABLE_TEXT_CLICK]: {
    type: 'NAVIGATION_EXPANDABLE_TEXT_CLICK',
    getEventModel: (payload: any): any => {
      const model = {
        eventType: ApplicationEventType.BUTTON_CLICKED,
        eventVar3: ''
      };

      const { isTextExpanded, itemType } = payload;

      let eventVar1: string = '';
      const eventVar2 = isTextExpanded ? ButtonType.Expand : ButtonType.Collapse;

      switch (itemType) {
        case 'Chapter':
          eventVar1 = isTextExpanded ? 'Navigation_chapters_see_more' : 'Navigation_chapters_see_less';
          break;
        case 'Slide':
          eventVar1 = isTextExpanded ? 'Navigation_slides_see_more' : 'Navigation_slides_see_less';
          break;
        case 'Hotspot':
          eventVar1 = isTextExpanded ? 'Navigation_hotspots_see_more' : 'Navigation_hotspots_see_less';
          break;
      }

      return { ...model, eventVar1, eventVar2 };
    }
  },

  [PluginsEvents.TRANSCRIPT_OPEN]: {
    type: 'TRANSCRIPT_OPEN',
    getEventModel: (payload: any): any => ({
      eventType: payload['auto'] ? ApplicationEventType.PAGE_LOAD : ApplicationEventType.BUTTON_CLICKED,
      eventVar1: payload['auto'] ? 'Transcript_open_auto' : 'Transcript_open_manual',
      eventVar2: PageLoadType.View,
      eventVar3: ''
    })
  },
  [PluginsEvents.TRANSCRIPT_CLOSE]: {
    type: 'TRANSCRIPT_CLOSE',
    getEventModel: (): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      eventVar1: 'Transcript_close',
      eventVar2: ButtonType.Close,
      eventVar3: ''
    })
  },
  [PluginsEvents.TRANSCRIPT_DOWNLOAD]: {
    type: 'TRANSCRIPT_DOWNLOAD',
    getEventModel: (payload: any): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      eventVar1: 'Transcript_download',
      eventVar2: ButtonType.Download,
      eventVar3: payload['videoPosition']
    })
  },
  [PluginsEvents.TRANSCRIPT_PRINT]: {
    type: 'TRANSCRIPT_PRINT',
    getEventModel: (payload: any): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      eventVar1: 'Transcript_print',
      eventVar2: ButtonType.Download,
      eventVar3: payload['videoPosition']
    })
  },
  [PluginsEvents.TRANSCRIPT_SEARCH]: {
    type: 'TRANSCRIPT_SEARCH',
    getEventModel: (payload: any): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      eventVar1: 'Transcript_search',
      eventVar2: ButtonType.Search,
      eventVar3: payload.search
    })
  },
  [PluginsEvents.TRANSCRIPT_NAVIGATE_RESULT]: {
    type: 'TRANSCRIPT_NAVIGATE_RESULT',
    getEventModel: (payload: any): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      eventVar1: 'Transcript_navigate_result',
      eventVar2: ButtonType.Navigate,
      eventVar3: payload.index
    })
  },
  [PluginsEvents.TRANSCRIPT_POPOUT_OPEN]: {
    type: 'TRANSCRIPT_POPOUT_OPEN',
    getEventModel: () => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      eventVar1: 'Transcript_popout_open',
      eventVar2: ButtonType.Expand,
      eventVar3: ''
    })
  },
  [PluginsEvents.TRANSCRIPT_POPOUT_CLOSE]: {
    type: 'TRANSCRIPT_POPOUT_CLOSE',
    getEventModel: (payload: { type: string }) => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      eventVar1: 'Transcript_popout_close',
      eventVar2: ButtonType.Collapse,
      eventVar3: payload.type
    })
  },
  [PluginsEvents.TRANSCRIPT_POPOUT_DRAG]: {
    type: 'TRANSCRIPT_POPOUT_DRAG',
    getEventModel: (payload: { position: { x: number; y: number } }) => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      eventVar1: 'Transcript_popout_drag',
      eventVar2: ButtonType.Edit,
      eventVar3: [payload.position.x, payload.position.y]
    })
  },
  [PluginsEvents.TRANSCRIPT_POPOUT_RESIZE]: {
    type: 'TRANSCRIPT_POPOUT_RESIZE',
    getEventModel: (payload: { size: { x: number; y: number } }) => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      eventVar1: 'Transcript_popout_resize',
      eventVar2: ButtonType.Edit,
      eventVar3: [payload.size.x, payload.size.y]
    })
  },
  [PluginsEvents.PLAYLIST_OPEN]: {
    type: 'PLAYLIST_OPEN',
    getEventModel: (payload: any): any => ({
      eventType: payload['auto'] ? ApplicationEventType.PAGE_LOAD : ApplicationEventType.BUTTON_CLICKED,
      eventVar1: payload['auto'] ? 'Playlist_side_panel_open_auto' : 'Playlist_side_panel_open_manual',
      eventVar2: PageLoadType.View,
      eventVar3: payload['position']
    })
  },
  [PluginsEvents.PLAYLIST_CLOSE]: {
    type: 'PLAYLIST_CLOSE',
    getEventModel: (payload: any): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      eventVar1: 'Playlist_side_panel_close_manual',
      eventVar2: ButtonType.Close,
      eventVar3: payload['position']
    })
  },
  [PluginsEvents.SKIP_BUTTON_CLICK]: {
    type: 'SKIP_BUTTON_CLICK',
    getEventModel: (payload: any): any => {
      const model = {
        eventType: ApplicationEventType.BUTTON_CLICKED,
        eventVar2: ButtonType.Navigate,
        eventVar3: ''
      };

      const { mode } = payload;
      let eventVar1: string = '';

      if (mode === 'intro') eventVar1 = 'Skip_intro_click';
      if (mode === 'outro') eventVar1 = 'Skip_outro_click';

      return { ...model, eventVar1 };
    }
  },
  [PluginsEvents.SKIP_BUTTON_DISPLAYED]: {
    type: 'SKIP_BUTTON_DISPLAYED',
    getEventModel: (payload: any): any => {
      const model = {
        eventType: ApplicationEventType.PAGE_LOAD,
        eventVar2: PageLoadType.View,
        eventVar3: ''
      };

      const { mode } = payload;
      let eventVar1: string = '';

      if (mode === 'intro') eventVar1 = 'Skip_intro_displayed';
      if (mode === 'outro') eventVar1 = 'Skip_outro_displayed';

      return { ...model, eventVar1 };
    }
  },
  [PluginsEvents.RELATED_OPEN]: {
    type: 'RELATED_OPEN',
    getEventModel: (payload: any): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      eventVar1: 'Related_open_manual',
      eventVar2: ButtonType.Open,
      eventVar3: payload['expandMode']
    })
  },
  [PluginsEvents.RELATED_CLOSE]: {
    type: 'RELATED_CLOSE',
    getEventModel: (): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      eventVar1: 'Related_close',
      eventVar2: ButtonType.Close,
      eventVar3: ''
    })
  },
  [PluginsEvents.RELATED_ENTRY_SELECTED]: {
    type: 'RELATED_ENTRY_SELECTED',
    getEventModel: (): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      eventVar1: 'Related_entry_click',
      eventVar2: ButtonType.Navigate,
      eventVar3: ''
    })
  },
  [PluginsEvents.RELATED_ENTRY_AUTO_PLAYED]: {
    type: 'RELATED_ENTRY_AUTO_PLAYED',
    getEventModel: (): any => ({
      eventType: ApplicationEventType.PAGE_LOAD,
      eventVar1: 'Related_entry_auto_continue',
      eventVar2: PageLoadType.View,
      eventVar3: ''
    })
  },
  [PluginsEvents.RELATED_GRID_DISPLAYED]: {
    type: 'RELATED_GRID_DISPLAYED',
    getEventModel: (): any => ({
      eventType: ApplicationEventType.PAGE_LOAD,
      eventVar1: 'Related_open_auto',
      eventVar2: PageLoadType.View,
      eventVar3: ''
    })
  },
  [PluginsEvents.CALL_TO_ACTION_BUTTON_CLICK]: {
    type: 'CALL_TO_ACTION_BUTTON_CLICK',
    getEventModel: (payload: any): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      eventVar3: payload['label'],
      eventVar2: ButtonType.Link,
      eventVar1: payload['type'] === 'primary' ? 'CTA_primary_button_click' : 'CTA_secondary_button_click'
    })
  },
  [PluginsEvents.HOTSPOT_DISPLAYED]: {
    type: 'HOTSPOT_DISPLAYED',
    getEventModel: (payload: any): any => ({
      eventType: ApplicationEventType.PAGE_LOAD,
      eventVar1: 'Hotspot_displayed',
      eventVar2: PageLoadType.View,
      eventVar3: payload['label']
    })
  },
  [PluginsEvents.HOTSPOT_CLICK]: {
    type: 'HOTSPOT_CLICK',
    getEventModel: (payload: any): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      eventVar1: 'Hotspot_click',
      eventVar2: ButtonType.Link,
      eventVar3: payload['label']
    })
  },
  [PluginsEvents.QUIZ_STARTED]: {
    type: 'QUIZ_STARTED',
    getEventModel: (): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      eventVar1: 'Quiz_start',
      eventVar2: ButtonType.Load,
      eventVar3: ''
    })
  },
  [PluginsEvents.QUIZ_SUBMITTED]: {
    type: 'QUIZ_SUBMITTED',
    getEventModel: (): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      eventVar1: 'Quiz_submit',
      eventVar2: ButtonType.Send,
      eventVar3: ''
    })
  },
  [PluginsEvents.QUIZ_SKIPPED]: {
    type: 'QUIZ_SKIPPED',
    getEventModel: ({ questionIndex }: { questionIndex: number }): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      eventVar1: 'Quiz_skip_question',
      eventVar2: ButtonType.Navigate,
      eventVar3: questionIndex
    })
  },
  [PluginsEvents.QUIZ_SEEK]: {
    type: 'QUIZ_SEEK',
    getEventModel: (): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      eventVar1: 'Quiz_nav_click',
      eventVar2: ButtonType.Navigate,
      eventVar3: ''
    })
  },
  [PlaykitUIEvents.USER_CLICKED_LOGO]: {
    type: 'USER_CLICKED_LOGO',
    getEventModel: (payload: any): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      eventVar1: 'Logo_click',
      eventVar2: ButtonType.Link,
      eventVar3: payload['logoUrl']
    })
  },
  [PlaykitUIEvents.USER_SELECTED_CAPTIONS_SIZE]: {
    type: 'USER_SELECTED_CAPTIONS_SIZE',
    getEventModel: (payload: any): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      eventVar1: 'Advanced_captions_size',
      eventVar2: ButtonType.Choose,
      eventVar3: payload
    })
  },
  [PlaykitUIEvents.USER_SELECTED_CAPTIONS_ALIGNMENT]: {
    type: 'USER_SELECTED_CAPTIONS_ALIGNMENT',
    getEventModel: (payload: any): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      eventVar1: 'Advanced_captions_font_alignment',
      eventVar2: ButtonType.Choose,
      eventVar3: payload
    })
  },
  [PlaykitUIEvents.USER_SELECTED_CAPTIONS_FONT_COLOR]: {
    type: 'USER_SELECTED_CAPTIONS_FONT_COLOR',
    getEventModel: (payload: any): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      eventVar1: 'Advanced_captions_font_color',
      eventVar2: ButtonType.Choose,
      eventVar3: payload
    })
  },
  [PlaykitUIEvents.USER_SELECTED_CAPTIONS_FONT_FAMILY]: {
    type: 'USER_SELECTED_CAPTIONS_FONT_FAMILY',
    getEventModel: (payload: any): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      eventVar1: 'Advanced_captions_font_family',
      eventVar2: ButtonType.Choose,
      eventVar3: payload
    })
  },
  [PlaykitUIEvents.USER_SELECTED_CAPTIONS_FONT_STYLE]: {
    type: 'USER_SELECTED_CAPTIONS_FONT_STYLE',
    getEventModel: (payload: any): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      eventVar1: 'Advanced_captions_font_style',
      eventVar2: ButtonType.Choose,
      eventVar3: payload
    })
  },
  [PlaykitUIEvents.USER_SELECTED_CAPTIONS_FONT_OPACITY]: {
    type: 'USER_SELECTED_CAPTIONS_FONT_OPACITY',
    getEventModel: (payload: any): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      eventVar1: 'Advanced_captions_font_opacity',
      eventVar2: ButtonType.Choose,
      eventVar3: `${String(payload).split('.')[1]}%`
    })
  },
  [PlaykitUIEvents.USER_SELECTED_CAPTIONS_BACKGROUND_COLOR]: {
    type: 'USER_SELECTED_CAPTIONS_BACKGROUND_COLOR',
    getEventModel: (payload: any): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      eventVar1: 'Advanced_captions_background_color',
      eventVar2: ButtonType.Choose,
      eventVar3: payload
    })
  },
  [PlaykitUIEvents.USER_SELECTED_CAPTIONS_BACKGROUND_OPACITY]: {
    type: 'USER_SELECTED_CAPTIONS_BACKGROUND_OPACITY',
    getEventModel: (payload: string): any => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      eventVar1: 'Advanced_captions_background_opacity',
      eventVar2: ButtonType.Choose,
      eventVar3: `${String(payload).split('.')[1] || String(payload)}%`
    })
  },
  [PluginsEvents.DETECT_AD_BLOCK_FULL_OVERLAY_SHOWN]: {
    type: 'DETECT_AD_BLOCK_FULL_OVERLAY_SHOWN',
    getEventModel: () => ({
      eventType: ApplicationEventType.PAGE_LOAD,
      eventVar2: PageLoadType.View,
      eventVar1: 'Ad_blocker_displayed',
      eventVar3: 'Allow_playback'
    })
  },
  [PluginsEvents.DETECT_AD_BLOCK_PARTIAL_OVERLAY_SHOWN]: {
    type: 'DETECT_AD_BLOCK_PARTIAL_OVERLAY_SHOWN',
    getEventModel: () => ({
      eventType: ApplicationEventType.PAGE_LOAD,
      eventVar2: PageLoadType.View,
      eventVar1: 'Ad_blocker_displayed',
      eventVar3: 'Block_playback'
    })
  },
  [PluginsEvents.DETECT_AD_BLOCK_SECONDARY_BUTTON_CLICKED]: {
    type: 'DETECT_AD_BLOCK_SECONDARY_BUTTON_CLICKED',
    getEventModel: () => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      eventVar2: ButtonType.Close,
      eventVar1: 'Ad_blocker_keep_watching',
      eventVar3: 'secondary_button'
    })
  },
  [PluginsEvents.DETECT_AD_BLOCK_X_BUTTON_CLICKED]: {
    type: 'DETECT_AD_BLOCK_X_BUTTON_CLICKED',
    getEventModel: () => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      eventVar2: ButtonType.Close,
      eventVar1: 'Ad_blocker_keep_watching',
      eventVar3: 'x_button'
    })
  },
  [PluginsEvents.DETECT_AD_BLOCK_AD_BLOCKER_DISABLED]: {
    type: 'DETECT_AD_BLOCK_AD_BLOCKER_DISABLED',
    getEventModel: () => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      eventVar2: ButtonType.Close,
      eventVar1: 'Ad_blocker_disabled_ad_blocker',
      eventVar3: 'disabled'
    })
  },
  [PluginsEvents.DETECT_AD_BLOCK_AD_BLOCKER_NOT_DISABLED]: {
    type: 'DETECT_AD_BLOCK_AD_BLOCKER_NOT_DISABLED',
    getEventModel: () => ({
      eventType: ApplicationEventType.BUTTON_CLICKED,
      eventVar2: ButtonType.Close,
      eventVar1: 'Ad_blocker_disabled_ad_blocker',
      eventVar3: 'still_detected'
    })
  }
};
