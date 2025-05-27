const playkitUIEventsNamespace = 'playkit-ui';
export const PlaykitUIEvents = {
  USER_CLICKED_LOGO: `${playkitUIEventsNamespace}-userclickedlogo`,
  USER_SELECTED_CAPTIONS_SIZE: `${playkitUIEventsNamespace}-userselectedcaptionssize`,
  USER_SELECTED_CAPTIONS_ALIGNMENT: `${playkitUIEventsNamespace}-userselectedcaptionsalignment`,
  USER_SELECTED_CAPTIONS_FONT_COLOR: `${playkitUIEventsNamespace}-userselectedcaptionsfontcolor`,
  USER_SELECTED_CAPTIONS_FONT_FAMILY: `${playkitUIEventsNamespace}-userselectedcaptionsfontfamily`,
  USER_SELECTED_CAPTIONS_FONT_STYLE: `${playkitUIEventsNamespace}-userselectedcaptionsfontstyle`,
  USER_SELECTED_CAPTIONS_FONT_OPACITY: `${playkitUIEventsNamespace}-userselectedcaptionsfontopacity`,
  USER_SELECTED_CAPTIONS_BACKGROUND_COLOR: `${playkitUIEventsNamespace}-userselectedcaptionsbackgroundcolor`,
  USER_SELECTED_CAPTIONS_BACKGROUND_OPACITY: `${playkitUIEventsNamespace}-userselectedcaptionsbackgroundopacity`,
  USER_SHOWED_CAPTIONS: `${playkitUIEventsNamespace}-usershowedcaptions`,
  USER_HID_CAPTIONS: `${playkitUIEventsNamespace}-userhidcaptions`,
  USER_SELECTED_CAPTION_TRACK: `${playkitUIEventsNamespace}-userselectedcaptiontrack`,
  USER_SELECTED_AUDIO_TRACK: `${playkitUIEventsNamespace}-userselectedaudiotrack`
};

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
  TRANSCRIPT_NAVIGATE_RESULT: 'transcript_navigate_result',
  TRANSCRIPT_POPOUT_OPEN: 'transcript_popout_open',
  TRANSCRIPT_POPOUT_CLOSE: 'transcript_popout_close',
  TRANSCRIPT_POPOUT_DRAG: 'transcript_popout_drag',
  TRANSCRIPT_POPOUT_RESIZE: 'transcript_popout_resize'
};

export const EadEvents = {
  EAD_ON: 'EAD_on',
  EAD_OFF: 'EAD_off',
  EAD_SKIP: 'EAD_skip',
  EAD_REPLAY: 'EAD_replay',
  EAD_PAUSE: 'EAD_pause',
  EAD_RESUME: 'EAD_resume',
  EAD_PLAY: 'EAD_play',
  EAD_SCROLL: 'EAD_scroll'
};

export const DualscreenEvents = {
  CHANGE_LAYOUT: 'dualscreen_change_layout',
  SIDE_DISPLAYED: 'dualscreen_side_displayed'
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
  RELATED_OPEN: 'related_open',
  RELATED_CLOSE: 'related_close',
  RELATED_ENTRY_SELECTED: 'related_entry_selected',
  RELATED_ENTRY_AUTO_PLAYED: 'related_entry_auto_played',
  RELATED_GRID_DISPLAYED: 'related_grid_displayed'
};

export const CallToActionEvents = {
  CALL_TO_ACTION_BUTTON_CLICK: 'call_to_action_button_click',
  CALL_TO_ACTION_DISPLAYED: 'call_to_action_displayed'
};

export const HotspotsEvents = {
  HOTSPOT_CLICK: 'hotspot_click',
  HOTSPOT_DISPLAYED: 'hotspot_displayed'
};

export const IvqEventTypes = {
  QUIZ_STARTED: 'QuizStarted',
  QUIZ_SKIPPED: 'QuizSkipped',
  QUIZ_SEEK: 'QuizSeek',
  QUESTION_ANSWERED: 'QuestionAnswered',
  QUIZ_SUBMITTED: 'QuizSubmitted',
  QUIZ_RETAKE: 'QuizRetake',
  QUIZ_QUESTION_CHANGED: 'QuizQuestionChanged'
};

export const DetectAdBlockEvents = {
  DETECT_AD_BLOCK_PARTIAL_OVERLAY_SHOWN: 'detect_ad_block_partial_overlay_shown',
  DETECT_AD_BLOCK_FULL_OVERLAY_SHOWN: 'detect_ad_block_full_overlay_shown',
  DETECT_AD_BLOCK_SECONDARY_BUTTON_CLICKED: 'detect_ad_block_secondary_button_clicked',
  DETECT_AD_BLOCK_X_BUTTON_CLICKED: 'detect_ad_block_x_button_clicked',
  DETECT_AD_BLOCK_AD_BLOCKER_DISABLED: 'detect_ad_block_ad_blocker_disabled',
  DETECT_AD_BLOCK_AD_BLOCKER_NOT_DISABLED: 'detect_ad_block_ad_blocker_not_disabled'
};

export const ReelsEvents = {
  REELS_PLAY: 'reels_play',
  REELS_PAUSE: 'reels_pause',
  REELS_MUTE: 'reels_mute',
  REELS_UNMUTE: 'reels_unmute',
  REELS_SEEK: 'reels_seek',
  REELS_POSTER_CLICKED: 'reels_poster_clicked',
  REELS_ENTRY_LOADED: 'reels_entry_loaded',
  REELS_PLAYLIST_LOADED: 'reels_playlist_loaded'
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
  ...CallToActionEvents,
  ...HotspotsEvents,
  ...IvqEventTypes,
  ...DetectAdBlockEvents,
  ...ReelsEvents,
  ...EadEvents
};
