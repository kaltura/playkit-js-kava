const DownloadEvent = {
  DOWNLOAD_ITEM_CLICKED: 'download_item_clicked'
};

const ModerationEvent = {
  REPORT_CLICKED: 'report_clicked',
  REPORT_SUBMITTED: 'report_submitted'
};

const ShareEvent = {
  /**
   * Fired when the user clicks on share icon.
   */
  SHARE_CLICKED: 'share_clicked',
  /**
   * Fired when the user clicks on specific social network.
   */
  SHARE_NETWORK: 'share_network'
};

const RelatedEvent = {
  /**
   * Fired when the user selects an entry from the list or the grid.
   */
  RELATED_SELECTED: 'related_selected',
  /**
   * Fired when the user clicks the button to show the related list.
   */
  RELATED_CLICKED: 'related_clicked'
};

const InfoEvent = {
  INFO_SCREEN_OPEN: 'info_screen_open'
};