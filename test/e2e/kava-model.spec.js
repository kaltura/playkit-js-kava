import {KavaModel} from '../../src/kava-model';

const ab = 3,
  avb = 5,
  pid = 'partner',
  eid = 'entry',
  plid = 'playlist',
  sid = 'session',
  referrer = 'http://referrer',
  cv = 'version',
  ct = 'html5:version',
  ks = 'ks',
  veid = '2468',
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
  tp = '12',
  pc = 'pc',
  av = 'av',
  app = 'app',
  kav = 'kav',
  ka = 'ka',
  usi = '1234',
  pbs = 1,
  psi = '1234-1234';

describe('KavaModel', () => {
  let model;
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
      targetPosition: tp,
      playbackSpeed: pbs
    });
    model.getActualBitrate = () => ab;
    model.getAverageBitrate = () => avb;
    model.getPartnerId = () => pid;
    model.getEntryId = () => eid;
    model.getPlaylistId = () => plid;
    model.getSessionId = () => sid;
    model.getReferrer = () => referrer;
    model.getClientVer = () => cv;
    model.getClientTag = () => ct;
    model.getKS = () => ks;
    model.getVirtualEventId = () => veid;
    model.getUIConfId = () => uic;
    model.getCustomVar1 = () => cv1;
    model.getCustomVar2 = () => cv2;
    model.getCustomVar3 = () => cv3;
    model.getPosition = () => pos;
    model.getDeliveryType = () => del;
    model.getPlaybackType = () => pback;
    model.getPlaybackType = () => pback;
    model.getPlaybackContext = () => pc;
    model.getApplicationVersion = () => av;
    model.getApplication = () => app;
    model.getKalturaApplicationVersion = () => kav;
    model.getKalturaApplication = () => ka;
    model.getUserId = () => usi;
    model.getPlaybackSpeed = () => pbs;
    model.getPersistentSessionId = () => psi;
  });

  it('should update the model', function () {
    model.updateModel({language: 'newLang'});
    model.getLanguage().should.equal('newLang');
  });

  it('should return the model', function () {
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
      playlistId: plid,
      sessionId: sid,
      eventIndex: ei,
      referrer: referrer,
      deliveryType: del,
      playbackType: pback,
      clientVer: cv,
      clientTag: ct,
      position: pos,
      ks: ks,
      virtualEventId: veid,
      uiConfId: uic,
      sessionStartTime: sst,
      customVar2: cv2,
      playbackContext: pc,
      applicationVer: av,
      application: app,
      kalturaApplicationVer: kav,
      kalturaApplication: ka,
      userId: usi,
      playbackSpeed: pbs,
      caption: cap,
      persistentSessionId: psi
    });
  });
});
