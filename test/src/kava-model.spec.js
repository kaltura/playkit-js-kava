import KavaModel from '../../src/kava-model';

const ab = 3,
  avb = 5,
  pid = 'partner',
  eid = 'entry',
  sid = 'session',
  referrer = 'http://referrer',
  cv = 'version',
  ct = 'html5:version',
  ks = 'ks',
  uic = 1234,
  cv1 = null,
  cv2 = {cv2: 'cv2'},
  cv3 = undefined,
  del = 'delivery',
  pos = 24.4,
  pback = 'playback',
  sst = new Date(),
  ei = 4,
  pts = 10002,
  bt = 2,
  bts = 12,
  lang = 'lang',
  cap = 'cap',
  ec = 200,
  jt = 1213,
  tp = '12';

describe('KavaModel', () => {
  let model;
  let sandbox;
  const eventModel = {
    MY_EVENT: {
      type: 'MY_EVENT',
      index: 99,
      getEventModel: model => ({
        playTimeSum: model.getPlayTimeSum(),
        bufferTime: model.getBufferTime(),
        bufferTimeSum: model.getBufferTimeSum(),
        actualBitrate: model.getActualBitrate(),
        averageBitrate: model.getAverageBitrate()
      })
    }
  };

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    sandbox.stub(KavaModel.prototype, 'getActualBitrate').callsFake(() => ab);
    sandbox.stub(KavaModel.prototype, 'getAverageBitrate').callsFake(() => avb);
    sandbox.stub(KavaModel.prototype, 'getPartnerId').callsFake(() => pid);
    sandbox.stub(KavaModel.prototype, 'getEntryId').callsFake(() => eid);
    sandbox.stub(KavaModel.prototype, 'getSessionId').callsFake(() => sid);
    sandbox.stub(KavaModel.prototype, 'getReferrer').callsFake(() => referrer);
    sandbox.stub(KavaModel.prototype, 'getClientVer').callsFake(() => cv);
    sandbox.stub(KavaModel.prototype, 'getClientTag').callsFake(() => ct);
    sandbox.stub(KavaModel.prototype, 'getKS').callsFake(() => ks);
    sandbox.stub(KavaModel.prototype, 'getUIConfId').callsFake(() => uic);
    sandbox.stub(KavaModel.prototype, 'getCustomVar1').callsFake(() => cv1);
    sandbox.stub(KavaModel.prototype, 'getCustomVar2').callsFake(() => cv2);
    sandbox.stub(KavaModel.prototype, 'getCustomVar3').callsFake(() => cv3);
    sandbox.stub(KavaModel.prototype, 'getPosition').callsFake(() => pos);
    sandbox.stub(KavaModel.prototype, 'getDeliveryType').callsFake(() => del);
    sandbox.stub(KavaModel.prototype, 'getPlaybackType').callsFake(() => pback);
    model = new KavaModel({
      sessionStartTime: sst,
      eventIndex: ei,
      playTimeSum: pts,
      bufferTime: bt,
      bufferTimeSum: bts,
      language: lang,
      caption: cap,
      errorCode: ec,
      joinTime: jt,
      targetPosition: tp
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should update the model', function() {
    model.updateModel({language: 'newLang'});
    model.getLanguage().should.equal('newLang');
  });

  it('should return the model', function() {
    const resultModel = model.getModel(eventModel.MY_EVENT);
    resultModel.should.deep.equal({
      playTimeSum: pts,
      bufferTime: bt,
      bufferTimeSum: bts,
      actualBitrate: ab,
      averageBitrate: avb,
      eventType: eventModel.MY_EVENT.index,
      partnerId: pid,
      entryId: eid,
      sessionId: sid,
      eventIndex: ei,
      referrer: referrer,
      deliveryType: del,
      playbackType: pback,
      clientVer: cv,
      clientTag: ct,
      position: pos,
      ks: ks,
      uiConfId: uic,
      sessionStartTime: sst,
      customVar2: cv2
    });
  });
});
