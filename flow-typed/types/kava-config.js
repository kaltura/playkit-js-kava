// @flow

/**
 * @typedef {Object} KavaConfigObject
 * @property {string} [serviceUrl] - The Kaltura API server.
 * @property {number} [viewEventCountdown] - The interval in seconds that VIEW event will be sent.
 * @property {number} [resetSessionCountdown] - The interval in seconds that Kava session will be reset.
 * @property {number} [dvrThreshold] - Threshold in seconds from the live edge.
 * @property {string} [applicationVersion] - Used to send the application version from which the user is playing the entry.
 * @property {string} [playbackContext] - Used to send the id of the category from which the user is playing the entry.
 * @property {Function} [tamperAnalyticsHandler] - An optional handler to implement. Can be used to manipulate the model data before analytics event sent, or to cancel a certain analytics request.
 * @property {Object} [customVar1] - Custom objects field.
 * @property {Object} [customVar2] - Custom objects field.
 * @property {Object} [customVar3] - Custom objects field.
 * @property {string} [userId] - custom user id .
 * @example
 * // Default config
 * {
 *  serviceUrl: '//analytics.kaltura.com/api_v3/index.php',
 *  viewEventCountdown: 30,
 *  resetSessionCountdown: 30,
 *  dvrThreshold: 120,
 *  applicationVersion: '',
 *  playbackContext: ''
 * }
 */
type _KavaConfigObject = {
  serviceUrl?: string,
  tamperAnalyticsHandler?: Function,
  viewEventCountdown?: number,
  resetSessionCountdown?: number,
  dvrThreshold?: number,
  customVar1?: Object,
  customVar2?: Object,
  customVar3?: Object,
  applicationVersion?: string,
  playbackContext?: string,
  userId?: string
};

/**
 * @function tamperAnalyticsHandler
 * @param {Object} model - Event model
 * @memberof KavaConfigObject
 * @returns {boolean} - Should send the request or not.
 * @example
 * tamperAnalyticsHandler: function (model) {
 *      // Always add myCustomFlag but don't send the request if the event type equals to 2
 *      model.myCustomFlag = true;
 *      if (model.eventType !== 2) {
 *        return true;
 *      }
 *      return false;
 *    }
 */
declare type KavaConfigObject = _KavaConfigObject;
