/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { getApplicationEventsModel } from '../../src/application-events-model';
import { ApplicationEventType } from '../../src/enums/application-event-type';
import { KalturaApplication } from '../../src/enums/kaltura-application';

const commonModel = {
  partnerId: '1234',
  entryId: '5678',
  sessionId: '91011',
  kalturaApplication: KalturaApplication.PLAYER,
  eventType: undefined,
  feature: undefined
};

describe('ApplicationEventsModel', () => {
  let customModel = {};
  let eventModel = {};

  const model = {
    getPartnerId: () => commonModel.partnerId,
    getEntryId: () => commonModel.entryId,
    getSessionId: () => commonModel.sessionId,
    getVirtualEventId: () => customModel['virtualEventId'],
    getApplication: () => customModel['application'],
    getKalturaApplication: () => customModel['application'],
    getApplicationVersion: () => customModel['applicationVersion'],
    getKalturaApplicationVersion: () => customModel['kalturaApplicationVersion'],
    getUserId: () => customModel['userId'],
    getKS: () => customModel['ks']
  };

  const eventObj = {
    getEventModel: () => eventModel
  };

  beforeEach(() => {
    customModel = {};
    eventModel = {};
  });

  describe('Common model parameters', () => {
    it('Should return the common model parameters', () => {
      getApplicationEventsModel(eventObj, model).should.deep.equal({
        ...commonModel
      });
    });
  });
  describe('Button Clicked parameters', () => {
    it('Should return the correct button clicked params', () => {
      eventModel = { eventType: ApplicationEventType.BUTTON_CLICKED, eventVar1: 'var1', eventVar2: 'var2', eventVar3: 'var3', eventVar4: 'var4' };

      getApplicationEventsModel(eventObj, model).should.deep.equal({
        ...commonModel,
        eventType: ApplicationEventType.BUTTON_CLICKED,
        buttonName: 'var1',
        buttonType: 'var2',
        buttonValue: 'var3',
        buttonInfo: 'var4'
      });
    });
  });
  describe('Page Load parameters', () => {
    it('Should return the correct page load params', () => {
      eventModel = { eventType: ApplicationEventType.PAGE_LOAD, eventVar1: 'var1', eventVar2: 'var2', eventVar3: 'var3', eventVar4: 'var4' };

      getApplicationEventsModel(eventObj, model).should.deep.equal({
        ...commonModel,
        eventType: ApplicationEventType.PAGE_LOAD,
        pageName: 'var1',
        pageType: 'var2',
        pageValue: 'var3',
        pageInfo: 'var4'
      });
    });
  });
  describe('Optional parameters', () => {
    it('Should return the correct event type value', () => {
      customModel = { application: 'abc' };

      getApplicationEventsModel(eventObj, model).should.deep.equal({
        ...commonModel,
        application: 'abc'
      });
    });
    it('Should return the correct feature value', () => {
      eventModel = { eventType: 'abc' };

      getApplicationEventsModel(eventObj, model).should.deep.equal({
        ...commonModel,
        eventType: 'abc'
      });
    });
    it('Should return the correct virtual event id value', () => {
      customModel = {
        virtualEventId: 'abc'
      };

      getApplicationEventsModel(eventObj, model).should.deep.equal({
        ...commonModel,
        virtualEventId: 'abc'
      });
    });
    it('Should return the correct kaltura application value', () => {
      customModel = { kalturaApplication: 'abc' };

      getApplicationEventsModel(eventObj, model).should.deep.equal({
        ...commonModel,
        kalturaApplication: KalturaApplication.PLAYER
      });
    });

    it('Should return the correct application version value', () => {
      customModel = { applicationVersion: 123 };

      getApplicationEventsModel(eventObj, model).should.deep.equal({
        ...commonModel,
        applicationVer: 123
      });
    });

    it('Should return the correct kaltura application version value', () => {
      customModel = { kalturaApplicationVersion: 123 };

      getApplicationEventsModel(eventObj, model).should.deep.equal({
        ...commonModel,
        kalturaApplicationVer: 123
      });
    });

    it('Should return the correct user id value', () => {
      customModel = { userId: 'abc' };

      getApplicationEventsModel(eventObj, model).should.deep.equal({
        ...commonModel,
        userId: 'abc'
      });
    });

    it('Should return the correct ks value', () => {
      customModel = { ks: 'abc' };

      getApplicationEventsModel(eventObj, model).should.deep.equal({
        ...commonModel,
        ks: 'abc'
      });
    });
  });
});
