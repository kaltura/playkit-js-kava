import '../../src/index.js';
import {loadPlayer} from '@playkit-js/playkit-js';
import * as TestUtils from './utils/test-utils';
import {OVPAnalyticsService, RequestBuilder} from 'playkit-js-providers/dist/playkit-analytics-service';
import {KavaEventModel} from '../../src/kava-event-model';

const targetId = 'player-placeholder_kava.spec';

describe('KavaPlugin', function() {
  let player;
  let kava;
  const config = {
    sources: {
      progressive: [
        {
          mimetype: 'video/mp4',
          url: 'http://www.html5videoplayer.net/videos/toystory.mp4'
        }
      ]
    },
    plugins: {
      kava: {}
    }
  };

  function createPlayerPlaceholder(targetId) {
    TestUtils.createElement('DIV', targetId);
    let el = document.getElementById(targetId);
    el.style.height = '360px';
    el.style.width = '640px';
  }

  function setupPlayer(config) {
    player = loadPlayer(config);
    const el = document.getElementById(targetId);
    el.appendChild(player.getView());
  }

  function getKavaPlugin() {
    return player._pluginManager.get('kava');
  }

  before(function() {
    createPlayerPlaceholder(targetId);
  });

  afterEach(function() {
    player.destroy();
    player = null;
    kava = null;
    TestUtils.removeVideoElementsFromTestPage();
  });

  after(function() {
    TestUtils.removeElement(targetId);
  });

  it('should reset kava session correctly', () => {
    setupPlayer(config);
    kava = getKavaPlugin();
    kava._resetSession();
    kava._model.getEventIndex().should.equal(1);
    kava._model.getBufferTimeSum().should.equal(0.0);
    kava._model.getPlayTimeSum().should.equal(0.0);
    kava._rateHandler.getAverage().should.equal(0);
  });

  it('should reset kava plugin correctly', () => {
    setupPlayer(config);
    kava = getKavaPlugin();
    kava.reset();
    kava._model.getEventIndex().should.equal(1);
    kava._model.getBufferTime().should.equal(0.0);
    kava._model.getBufferTimeSum().should.equal(0.0);
    kava._isFirstPlay.should.be.true;
    kava._isEnded.should.be.false;
    kava._isPaused.should.be.false;
    (kava._model.getSessionStartTime() === null).should.be.true;
    kava._timePercentEvent.PLAY_REACHED_25_PERCENT.should.be.false;
    kava._timePercentEvent.PLAY_REACHED_50_PERCENT.should.be.false;
    kava._timePercentEvent.PLAY_REACHED_75_PERCENT.should.be.false;
    kava._timePercentEvent.PLAY_REACHED_100_PERCENT.should.be.false;
  });

  describe('SendAnalytics', () => {
    let sandbox;
    const config = {
      sources: {
        progressive: [
          {
            bandwidth: 480256,
            mimetype: 'video/mp4',
            url: 'http://www.html5videoplayer.net/videos/toystory.mp4'
          }
        ]
      },
      plugins: {
        kava: {
          referrer: 'referrer',
          serviceUrl: '//analytics.kaltura.com/api_v3/index.php',
          viewEventCountdown: 10,
          resetSessionCountdown: 30,
          playerVersion: '0.18.1',
          playerName: 'kaltura-player-js',
          partnerId: '1091',
          entryId: '0_wifqaipd',
          playlistId: '12345678',
          entryType: 'Vod',
          sessionId: 'c15be273-0f1b-10a3-4fc9-d7a53eebee85:b66abd37-e2e2-a22e-86ac-7859592e754b',
          ks: 'Njk0ZmI4MzBiOTJiMGZhN2NmNTAwYWQyZGM2M2Y0YjkxMGRiZGI3MXwxMDkxOzEwOTE7MTUxNzkyMjgxMzswOzE1MTc4MzY0MTMuMTM4OzA7dmlldzoqLHdpZGdldDoxOzs='
        }
      },
      session: {
        id: 'c15be273-0f1b-10a3-4fc9-d7a53eebee85:b66abd37-e2e2-a22e-86ac-7859592e754b',
        partnerId: 1091,
        ks: 'Njk0ZmI4MzBiOTJiMGZhN2NmNTAwYWQyZGM2M2Y0YjkxMGRiZGI3MXwxMDkxOzEwOTE7MTUxNzkyMjgxMzswOzE1MTc4MzY0MTMuMTM4OzA7dmlldzoqLHdpZGdldDoxOzs='
      },
      id: '0_wifqaipd',
      name: 'MPEG Dash with MultiAudio New Transcoding',
      duration: 741,
      type: 'Vod',
      dvr: false
    };

    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      sandbox.stub(RequestBuilder.prototype, 'doHttpRequest').callsFake(() => {
        return Promise.resolve();
      });
    });

    afterEach(() => {
      sandbox.restore();
    });

    function validateCommonParams(params, eventIndex) {
      params.eventType.should.equal(eventIndex);
      params.partnerId.should.equal(config.session.partnerId.toString());
      params.entryId.should.equal(config.id);
      params.playlistId.should.equal(config.plugins.kava.playlistId);
      params.sessionId.should.equal(config.session.id);
      params.eventIndex.should.equal(1);
      params.ks.should.equal(config.session.ks);
      params.referrer.should.equal(config.plugins.kava.referrer);
      params.deliveryType.should.equal('url');
      params.playbackType.should.equal('vod');
      (!!params.sessionStartTime).should.be.false;
      params.clientVer.should.equal(config.plugins.kava.playerVersion);
      params.clientTag.should.equal('html5:v' + config.plugins.kava.playerVersion);
      params.position.should.exist;
    }

    it('should send IMPRESSION event', done => {
      sandbox.stub(OVPAnalyticsService, 'trackEvent').callsFake((serviceUrl, params) => {
        if (params.eventType !== KavaEventModel.IMPRESSION.index) return;
        validateCommonParams(params, KavaEventModel.IMPRESSION.index);
        done();
      });
      setupPlayer(config);
      kava = getKavaPlugin();
      player.play();
    });

    it('should send PLAY_REQUEST event', done => {
      sandbox.stub(OVPAnalyticsService, 'trackEvent').callsFake((serviceUrl, params) => {
        if (params.eventType !== KavaEventModel.PLAY_REQUEST.index) return;
        validateCommonParams(params, KavaEventModel.PLAY_REQUEST.index);
        done();
      });
      setupPlayer(config);
      kava = getKavaPlugin();
      player.play();
    });

    it('should send PLAY event', done => {
      sandbox.stub(OVPAnalyticsService, 'trackEvent').callsFake((serviceUrl, params) => {
        if (params.eventType !== KavaEventModel.PLAY.index) return;
        validateCommonParams(params, KavaEventModel.PLAY.index);
        params.bufferTime.should.exist;
        params.bufferTimeSum.should.exist;
        params.actualBitrate.should.exist;
        params.joinTime.should.exist;
        done();
      });
      setupPlayer(config);
      kava = getKavaPlugin();
      player.play();
    });

    it('should send RESUME event', done => {
      sandbox.stub(OVPAnalyticsService, 'trackEvent').callsFake((serviceUrl, params) => {
        if (params.eventType !== KavaEventModel.RESUME.index) return;
        validateCommonParams(params, KavaEventModel.RESUME.index);
        params.bufferTime.should.exist;
        params.bufferTimeSum.should.exist;
        params.actualBitrate.should.exist;
        done();
      });
      setupPlayer(config);
      kava = getKavaPlugin();
      const onPlaying = () => {
        player.removeEventListener(player.Event.PLAYING, onPlaying);
        player.pause();
      };
      const onPause = () => {
        player.removeEventListener(player.Event.PLAYING, onPause);
        player.play();
      };
      player.addEventListener(player.Event.PLAYING, onPlaying);
      player.addEventListener(player.Event.PLAYING, onPause);
      player.play();
    });

    it('should send PAUSE event', done => {
      sandbox.stub(OVPAnalyticsService, 'trackEvent').callsFake((serviceUrl, params) => {
        if (params.eventType !== KavaEventModel.PAUSE.index) return;
        validateCommonParams(params, KavaEventModel.PAUSE.index);
        kava._timer._stopped.should.be.true;
        done();
      });
      setupPlayer(config);
      kava = getKavaPlugin();
      const onPlaying = () => {
        player.removeEventListener(player.Event.PLAYING, onPlaying);
        player.pause();
      };
      player.addEventListener(player.Event.PLAYING, onPlaying);
      player.play();
    });

    it('should send REPLAY event', done => {
      sandbox.stub(OVPAnalyticsService, 'trackEvent').callsFake((serviceUrl, params) => {
        if (params.eventType !== KavaEventModel.REPLAY.index) return;
        validateCommonParams(params, KavaEventModel.REPLAY.index);
        done();
      });
      setupPlayer(config);
      kava = getKavaPlugin();
      const onPlaying = () => {
        player.removeEventListener(player.Event.PLAYING, onPlaying);
        player.currentTime = player.duration;
      };
      const onEnded = () => {
        player.removeEventListener(player.Event.ENDED, onEnded);
        player.play();
      };
      player.addEventListener(player.Event.PLAYING, onPlaying);
      player.addEventListener(player.Event.ENDED, onEnded);
      player.play();
    });

    it('should send SEEK event', done => {
      sandbox.stub(OVPAnalyticsService, 'trackEvent').callsFake((serviceUrl, params) => {
        if (params.eventType !== KavaEventModel.SEEK.index) return;
        validateCommonParams(params, KavaEventModel.SEEK.index);
        params.targetPosition.should.exist;
        done();
      });
      setupPlayer(config);
      kava = getKavaPlugin();
      const onPlaying = () => {
        player.removeEventListener(player.Event.PLAYING, onPlaying);
        player.currentTime = player.duration - 1;
      };
      player.addEventListener(player.Event.PLAYING, onPlaying);
      player.play();
    });

    it('should send PLAY_REACHED_25_PERCENT event', done => {
      sandbox.stub(OVPAnalyticsService, 'trackEvent').callsFake((serviceUrl, params) => {
        if (params.eventType !== KavaEventModel.PLAY_REACHED_25_PERCENT.index) return;
        validateCommonParams(params, KavaEventModel.PLAY_REACHED_25_PERCENT.index);
        done();
      });
      setupPlayer(config);
      kava = getKavaPlugin();
      const onPlaying = () => {
        player.removeEventListener(player.Event.PLAYING, onPlaying);
        player.currentTime = player.duration / 4;
      };
      player.addEventListener(player.Event.PLAYING, onPlaying);
      player.play();
    });

    it('should send PLAY_REACHED_50_PERCENT event', done => {
      sandbox.stub(OVPAnalyticsService, 'trackEvent').callsFake((serviceUrl, params) => {
        if (params.eventType !== KavaEventModel.PLAY_REACHED_50_PERCENT.index) return;
        validateCommonParams(params, KavaEventModel.PLAY_REACHED_50_PERCENT.index);
        done();
      });
      setupPlayer(config);
      kava = getKavaPlugin();
      const onPlaying = () => {
        player.removeEventListener(player.Event.PLAYING, onPlaying);
        player.currentTime = player.duration / 2;
      };
      player.addEventListener(player.Event.PLAYING, onPlaying);
      player.play();
    });

    it('should send PLAY_REACHED_75_PERCENT event', done => {
      sandbox.stub(OVPAnalyticsService, 'trackEvent').callsFake((serviceUrl, params) => {
        if (params.eventType !== KavaEventModel.PLAY_REACHED_75_PERCENT.index) return;
        validateCommonParams(params, KavaEventModel.PLAY_REACHED_75_PERCENT.index);
        done();
      });
      setupPlayer(config);
      kava = getKavaPlugin();
      const onPlaying = () => {
        player.removeEventListener(player.Event.PLAYING, onPlaying);
        player.currentTime = player.duration - 1;
      };
      player.addEventListener(player.Event.PLAYING, onPlaying);
      player.play();
    });

    it('should send PLAY_REACHED_100_PERCENT event', done => {
      sandbox.stub(OVPAnalyticsService, 'trackEvent').callsFake((serviceUrl, params) => {
        if (params.eventType !== KavaEventModel.PLAY_REACHED_100_PERCENT.index) return;
        validateCommonParams(params, KavaEventModel.PLAY_REACHED_100_PERCENT.index);
        done();
      });
      setupPlayer(config);
      kava = getKavaPlugin();
      const onPlaying = () => {
        player.removeEventListener(player.Event.PLAYING, onPlaying);
        player.currentTime = player.duration - 1;
      };
      player.addEventListener(player.Event.PLAYING, onPlaying);
      player.play();
    });

    it('should send SOURCE_SELECTED event', done => {
      sandbox.stub(OVPAnalyticsService, 'trackEvent').callsFake((serviceUrl, params) => {
        if (params.eventType !== KavaEventModel.SOURCE_SELECTED.index) return;
        validateCommonParams(params, KavaEventModel.SOURCE_SELECTED.index);
        params.actualBitrate.should.equal(480256 / 1024);
        done();
        return new RequestBuilder();
      });
      setupPlayer(config);
      kava = getKavaPlugin();
      player.play();
      player.ready().then(() => {
        kava._sendAnalytics(KavaEventModel.SOURCE_SELECTED);
      });
    });

    it('should send FLAVOR_SWITCH event', done => {
      sandbox.stub(OVPAnalyticsService, 'trackEvent').callsFake((serviceUrl, params) => {
        if (params.eventType !== KavaEventModel.FLAVOR_SWITCH.index) return;
        validateCommonParams(params, KavaEventModel.FLAVOR_SWITCH.index);
        params.actualBitrate.should.equal(480256 / 1024);
        done();
        return new RequestBuilder();
      });
      setupPlayer(config);
      kava = getKavaPlugin();
      player.play();
      player.ready().then(() => {
        kava._sendAnalytics(KavaEventModel.FLAVOR_SWITCH);
      });
    });

    it('should send AUDIO_SELECTED event', done => {
      sandbox.stub(OVPAnalyticsService, 'trackEvent').callsFake((serviceUrl, params) => {
        if (params.eventType !== KavaEventModel.AUDIO_SELECTED.index) return;
        validateCommonParams(params, KavaEventModel.AUDIO_SELECTED.index);
        params.language.should.equal('heb');
        done();
      });
      setupPlayer(config);
      kava = getKavaPlugin();
      kava._model.updateModel({language: 'heb'});
      kava._sendAnalytics(KavaEventModel.AUDIO_SELECTED);
    });

    it('should send CAPTIONS event', done => {
      sandbox.stub(OVPAnalyticsService, 'trackEvent').callsFake((serviceUrl, params) => {
        validateCommonParams(params, KavaEventModel.CAPTIONS.index);
        params.caption.should.equal('eng');
        done();
      });
      setupPlayer(config);
      kava = getKavaPlugin();
      kava._model.updateModel({caption: 'eng'});
      kava._sendAnalytics(KavaEventModel.CAPTIONS);
    });

    it('should send ERROR event', done => {
      sandbox.stub(OVPAnalyticsService, 'trackEvent').callsFake((serviceUrl, params) => {
        validateCommonParams(params, KavaEventModel.ERROR.index);
        params.errorCode.should.equal(200);
        done();
      });
      setupPlayer(config);
      kava = getKavaPlugin();
      kava._model.updateModel({errorCode: 200});
      kava._sendAnalytics(KavaEventModel.ERROR);
    });

    it('should send VIEW event', done => {
      sandbox.stub(OVPAnalyticsService, 'trackEvent').callsFake((serviceUrl, params) => {
        validateCommonParams(params, KavaEventModel.VIEW.index);
        params.playTimeSum.should.exist;
        params.bufferTime.should.exist;
        params.bufferTimeSum.should.exist;
        params.actualBitrate.should.exist;
        params.averageBitrate.should.exist;
        done();
        return new RequestBuilder();
      });
      setupPlayer(config);
      kava = getKavaPlugin();
      player.play();
    });

    it('should send BUFFER_START event', done => {
      sandbox.stub(OVPAnalyticsService, 'trackEvent').callsFake((serviceUrl, params) => {
        validateCommonParams(params, KavaEventModel.BUFFER_START.index);
        done();
        return new RequestBuilder();
      });
      setupPlayer(config);
      kava = getKavaPlugin();
      kava._onPlayerStateChanged({
        payload: {
          oldState: {
            type: 'playing'
          },
          newState: {
            type: 'buffering'
          }
        }
      });
    });

    it('should send BUFFER_END event', done => {
      sandbox.stub(OVPAnalyticsService, 'trackEvent').callsFake((serviceUrl, params) => {
        validateCommonParams(params, KavaEventModel.BUFFER_END.index);
        done();
        return new RequestBuilder();
      });
      setupPlayer(config);
      kava = getKavaPlugin();
      kava._onPlayerStateChanged({
        payload: {
          newState: {
            type: 'playing'
          },
          oldState: {
            type: 'buffering'
          }
        }
      });
    });
  });

  describe('Server Response', () => {
    let sandbox;
    const config = {
      sources: {
        progressive: [
          {
            mimetype: 'video/mp4',
            url: 'http://www.html5videoplayer.net/videos/toystory.mp4'
          }
        ]
      },
      plugins: {
        kava: {
          serviceUrl: '//analytics.kaltura.com/api_v3/index.php',
          viewEventCountdown: 10,
          resetSessionCountdown: 30,
          playerVersion: '0.18.1',
          playerName: 'kaltura-player-js',
          partnerId: '1091',
          entryId: '0_wifqaipd',
          entryType: 'Vod',
          sessionId: 'c15be273-0f1b-10a3-4fc9-d7a53eebee85:b66abd37-e2e2-a22e-86ac-7859592e754b',
          ks: 'Njk0ZmI4MzBiOTJiMGZhN2NmNTAwYWQyZGM2M2Y0YjkxMGRiZGI3MXwxMDkxOzEwOTE7MTUxNzkyMjgxMzswOzE1MTc4MzY0MTMuMTM4OzA7dmlldzoqLHdpZGdldDoxOzs='
        }
      },
      session: {
        id: 'c15be273-0f1b-10a3-4fc9-d7a53eebee85:b66abd37-e2e2-a22e-86ac-7859592e754b',
        partnerId: 1091,
        ks: 'Njk0ZmI4MzBiOTJiMGZhN2NmNTAwYWQyZGM2M2Y0YjkxMGRiZGI3MXwxMDkxOzEwOTE7MTUxNzkyMjgxMzswOzE1MTc4MzY0MTMuMTM4OzA7dmlldzoqLHdpZGdldDoxOzs='
      },
      id: '0_wifqaipd',
      name: 'MPEG Dash with MultiAudio New Transcoding',
      duration: 741,
      type: 'Vod',
      dvr: false
    };

    beforeEach(() => {
      sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should handle server response of type number', done => {
      new Promise(resolve => {
        sandbox.stub(RequestBuilder.prototype, 'doHttpRequest').callsFake(() => {
          setTimeout(resolve, 1000);
          return Promise.resolve(12345);
        });
        setupPlayer(config);
        kava = getKavaPlugin();
        kava._sendAnalytics(KavaEventModel.VIEW);
      }).then(() => {
        kava._model.getSessionStartTime().should.equal(12345);
        done();
      });
    });

    it('should handle server response of type object', done => {
      new Promise(resolve => {
        sandbox.stub(RequestBuilder.prototype, 'doHttpRequest').callsFake(() => {
          setTimeout(resolve, 1000);
          return Promise.resolve({
            time: 12345,
            viewEventsEnabled: false
          });
        });
        setupPlayer(config);
        kava = getKavaPlugin();
        kava._sendAnalytics(KavaEventModel.VIEW);
      }).then(() => {
        kava._model.getSessionStartTime().should.equal(12345);
        kava._viewEventEnabled.should.equal(false);
        done();
      });
    });
  });
});
