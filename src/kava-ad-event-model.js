// @flow
import {KavaModel} from './kava-model';
export const KavaAdEventModel: {[event: string]: KavaEvent} = {
  /**
   * @type {string} AD_STARTED
   * @memberof KavaEventType
   */
  AD_STARTED: {
    type: 'AD_STARTED',
    index: 9999,
    getEventModel: (model: KavaModel) => {
      return model.getAdCommonModel();
    }
  }
};

export const KavaAdEventType: {[event: string]: string} = (eventType => {
  Object.keys(KavaAdEventModel).forEach(k => (eventType[k] = k));
  return eventType;
})({});
