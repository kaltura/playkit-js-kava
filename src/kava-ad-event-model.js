// @flow
import {KavaModel} from './kava-model';
export const KavaAdEventModel: {[event: string]: KavaEvent} = {
  /**
   * @type {string} AD_IMPRESSION
   * @memberof KavaAdEventType
   */
  AD_IMPRESSION: {
    type: 'AD_IMPRESSION',
    index: 8999,
    getEventModel: (model: KavaModel) => {
      return model.getAdCommonModel();
    }
  },

  /**
   * @type {string} AD_STARTED
   * @memberof KavaAdEventType
   */
  AD_STARTED: {
    type: 'AD_STARTED',
    index: 9000,
    getEventModel: (model: KavaModel) => {
      return model.getAdCommonModel();
    }
  },

  /**
   * @type {string} AD_SKIPPED
   * @memberof KavaAdEventType
   */
  AD_SKIPPED: {
    type: 'AD_SKIPPED',
    index: 9001,
    getEventModel: (model: KavaModel) => {
      return model.getAdCommonModel();
    }
  },

  /**
   * @type {string} AD_FIRST_QUARTILE
   * @memberof KavaAdEventType
   */
  AD_FIRST_QUARTILE: {
    type: 'AD_FIRST_QUARTILE',
    index: 9002,
    getEventModel: (model: KavaModel) => {
      return model.getAdCommonModel();
    }
  },

  /**
   * @type {string} AD_MID_POINT
   * @memberof KavaAdEventType
   */
  AD_MID_POINT: {
    type: 'AD_MID_POINT',
    index: 9003,
    getEventModel: (model: KavaModel) => {
      return model.getAdCommonModel();
    }
  },

  /**
   * @type {string} AD_THIRD_QUARTILE
   * @memberof KavaAdEventType
   */
  AD_THIRD_QUARTILE: {
    type: 'AD_THIRD_QUARTILE',
    index: 9004,
    getEventModel: (model: KavaModel) => {
      return model.getAdCommonModel();
    }
  },

  /**
   * @type {string} AD_COMPLETED
   * @memberof KavaAdEventType
   */
  AD_COMPLETED: {
    type: 'AD_COMPLETED',
    index: 9005,
    getEventModel: (model: KavaModel) => {
      return model.getAdCommonModel();
    }
  },
  /**
   * @type {string} AD_ERROR
   * @memberof KavaAdEventType
   */
  AD_ERROR: {
    type: 'AD_ERROR',
    index: 9006,
    getEventModel: (model: KavaModel) => {
      let adModel = model.getAdCommonModel();
      adModel.adErrorCode = model.getAdErrorCode();
      adModel.adCurrentTime = model.getAdCurrentTime();
      return adModel;
    }
  }
};

export const KavaAdEventType: {[event: string]: string} = (eventType => {
  Object.keys(KavaAdEventModel).forEach(k => (eventType[k] = k));
  return eventType;
})({});
