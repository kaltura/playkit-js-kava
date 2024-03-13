export const NavigationEvents = {
  NAVIGATION_OPEN: 'navigation_open',
  NAVIGATION_CLOSE: 'navigation_close',
  NAVIGATION_SEARCH: 'navigation_search',
  NAVIGATION_ITEM_CLICK: 'navigation_item_click',
  NAVIGATION_EXPANDABLE_TEXT_CLICK: 'navigation_expandable_text_clicked'
};

export const DownloadEvents = {
  DOWNLOAD_ITEM_CLICKED: 'download_item_clicked',
  SHOW_OVERLAY: 'download_show_overlay',
  HIDE_OVERLAY: 'download_hide_overlay'
};

export const TranscriptEvents = {
  TRANSCRIPT_OPEN: 'transcript_open',
  TRANSCRIPT_CLOSE: 'transcript_close',
  TRANSCRIPT_DOWNLOAD: 'transcript_download',
  TRANSCRIPT_PRINT: 'transcript_print',
  TRANSCRIPT_SEARCH: 'transcript_search',
  TRANSCRIPT_NAVIGATE_RESULT: 'transcript_navigate_result'
};

export const DualscreenEvents = {
  CHANGE_LAYOUT: 'dualscreen_change_layout'
};
export const ShareEvents = {
  SHARE_CLICKED: 'share_clicked',
  SHARE_CLOSE: 'share_close',
  SHARE_NETWORK: 'share_network',
  SHARE_COPY: 'share_copy'
};

export const BumperEvents = {
  BUMPER_CLICKED: 'bumper_clicked'
};
export const SkipEvents = {
  SKIP_BUTTON_CLICK: 'skip_button_click',
  SKIP_BUTTON_DISPLAYED: 'skip_button_displayed'
};
export const PlaylistEvents = {
  PLAYLIST_OPEN: 'playlist_open',
  PLAYLIST_CLOSE: 'playlist_close'
};

export const RelatedEvents = {
  RELATED_SELECTED: 'related_selected',
  RELATED_OPEN: 'related_open',
  RELATED_CLOSE: 'related_close'
};

export const CallToActionEvents = {
  CALL_TO_ACTION_BUTTON_CLICK: 'call_to_action_button_click',
};

export const PluginsEvents = {
  ...NavigationEvents,
  ...DownloadEvents,
  ...TranscriptEvents,
  ...DualscreenEvents,
  ...ShareEvents,
  ...BumperEvents,
  ...SkipEvents,
  ...PlaylistEvents,
  ...RelatedEvents,
  ...CallToActionEvents
};
