const playkitUIEventsNamespace = 'playkit-ui';
export const PlaykitUIEvents = {
  USER_CLICKED_LOGO: `${playkitUIEventsNamespace}-userclickedlogo`,
  USER_SELECTED_CAPTIONS_SIZE: `${playkitUIEventsNamespace}-userselectedcaptionssize`,
  USER_SELECTED_CAPTIONS_WEIGHT: `${playkitUIEventsNamespace}-userselectedcaptionsweight`,
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
  USER_SELECTED_AUDIO_TRACK: `${playkitUIEventsNamespace}-userselectedaudiotrack`,
  USER_COPIED_DEBUG_INFO: `${playkitUIEventsNamespace}-usercopieddebuginfo`,
  DISPLAY_INFO_BEFORE_PLAYBACK: `${playkitUIEventsNamespace}-displayinfobeforeplayback`,
  USER_SELECTED_CAPTIONS_PRESET_MINIMALIST: `${playkitUIEventsNamespace}-userselectedcaptionspresetminimalist`,
  USER_SELECTED_CAPTIONS_PRESET_HIGH_CONTRAST: `${playkitUIEventsNamespace}-userselectedcaptionspresethighcontrast`,
  USER_SELECTED_CAPTIONS_PRESET_CLASSIC_TV_STYLE: `${playkitUIEventsNamespace}-userselectedcaptionspresetclassictvstyle`,
  USER_SELECTED_CAPTIONS_PRESET_EASY_READING: `${playkitUIEventsNamespace}-userselectedcaptionspreseteasyreading`,
  USER_SELECTED_CAPTIONS_PRESET_EARLY_READERS: `${playkitUIEventsNamespace}-userselectedcaptionspresetearlyreaders`,
  USER_SELECTED_CAPTIONS_PRESET_NIGHT_MODE: `${playkitUIEventsNamespace}-userselectedcaptionspresetnightmode`,
  USER_SELECTED_CAPTIONS_CUSTOM: `${playkitUIEventsNamespace}-userselectedcaptionscustom`,
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

export const SummaryAndChaptersEvents = {
  SUMMARY_CHAPTERS_OPEN: 'summary_chapters_open',
  SUMMARY_CHAPTERS_CLOSE: 'summary_chapters_close',
  SUMMARY_CHAPTERS_READ_CHAPTERS: 'summary_chapters_read_chapters',
  SUMMARY_CHAPTERS_READ_OVERVIEW: 'summary_chapters_read_overview',
  SUMMARY_CHAPTERS_COPY_TO_CLIPBOARD: 'summary_chapters_copy_to_clipboard',
  SUMMARY_CHAPTERS_CHAPTER_EXPAND: 'summary_chapters_chapter_expand',
  SUMMARY_CHAPTERS_CHAPTER_COLLAPSE: 'summary_chapters_chapter_collapse',
  SUMMARY_CHAPTERS_CHAPTER_SEEK: 'summary_chapters_chapter_seek'
};

export const AudioPlayerEvents = {
  AUDIO_PLAYER_VISUALIZATION_STATE: 'audio_player_visualization_state'
};

export const CpeTrackerEvents = {
  CPE_TRACKER_HOVER: 'cpe_tracker_hover'
};

export const BannerOverlayEvents = {
  BANNER_MESSAGE_DISPLAYS: 'banner_message_displays',
  BANNER_MESSAGE_MANUALLY_DISMISSED: 'banner_message_manually_dismissed'
};

// events fired by the kava plugin itself - the kava plugin does not listen to these events
export const KavaEvents = {
  KAVA_REQUEST_SUCCEEDED: 'kava_request_succeeded',
  KAVA_REQUEST_FAILED: 'kava_request_failed'
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
  ...EadEvents,
  ...SummaryAndChaptersEvents,
  ...AudioPlayerEvents,
  ...CpeTrackerEvents,
  ...BannerOverlayEvents
};
