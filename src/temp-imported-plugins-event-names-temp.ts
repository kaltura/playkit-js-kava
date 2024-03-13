export const DownloadEvent = {
  DOWNLOAD_ITEM_CLICKED: 'download_item_clicked'
};

export const ModerationEvent = {
  REPORT_CLICKED: 'report_clicked',
  REPORT_SUBMITTED: 'report_submitted'
};

export const ShareEvent = {
  /**
   * Fired when the user clicks on share icon.
   */
  SHARE_CLICKED: 'share_clicked',
  /**
   * Fired when the user clicks on specific social network.
   */
  SHARE_NETWORK: 'share_network'
};

export const RelatedEvent = {
  /**
   * Fired when the user selects an entry from the list or the grid.
   */
  RELATED_SELECTED: 'related_selected',
  /**
   * Fired when the user clicks the button to show the related list.
   */
  RELATED_OPEN: 'related_open',
  /**
   * Fired when the user clicks to close the related list.
   */
  RELATED_CLOSE: 'related_close'
};

export const InfoEvent = {
  INFO_SCREEN_OPEN: 'info_screen_open'
};
