import '../../src/index.js';
import {loadPlayer, FakeEvent, CustomEventType} from '@playkit-js/playkit-js';
import * as TestUtils from './utils/test-utils';
import {OVPAnalyticsService, RequestBuilder} from '@playkit-js/ovp-provider/dist/services/analytics';
import {KavaEventModel} from '../../src/kava-event-model';
import {SoundMode, TabMode} from '../../src/kava-model';

const targetId = 'player-placeholder_kava.spec';

describe('KavaPlugin', function() {
  let player;
  let kava;
  const config = {
    sources: {
      progressive: [
        {
          mimetype: 'video/mp4',
          url: 'https://cfvod.kaltura.com/pd/p/1740481/sp/174048100/serveFlavor/entryId/1_kbyh1guy/v/1/flavorId/1_hq6oztva/name/a.mp4'
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
    let sandbox = sinon.sandbox.create();
    const config = {
      sources: {
        progressive: [
          {
            bandwidth: 480256,
            mimetype: 'video/mp4',
            url: 'https://cfvod.kaltura.com/pd/p/1740481/sp/174048100/serveFlavor/entryId/1_kbyh1guy/v/1/flavorId/1_hq6oztva/name/a.mp4'
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
          ks: 'Njk0ZmI4MzBiOTJiMGZhN2NmNTAwYWQyZGM2M2Y0YjkxMGRiZGI3MXwxMDkxOzEwOTE7MTUxNzkyMjgxMzswOzE1MTc4MzY0MTMuMTM4OzA7dmlldzoqLHdpZGdldDoxOzs=',
          userId: '1234'
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
      // params.eventIndex.should.equal(1);
      params.ks.should.equal(config.session.ks);
      params.referrer.should.equal(config.plugins.kava.referrer);
      params.deliveryType.should.equal('url');
      params.playbackType.should.equal('vod');
      (!!params.sessionStartTime).should.be.false;
      params.clientVer.should.equal(config.plugins.kava.playerVersion);
      params.clientTag.should.equal('html5:v' + config.plugins.kava.playerVersion);
      params.position.should.exist;
      params.userId.should.equal(config.plugins.kava.userId);
    }

    it('should send IMPRESSION event', done => {
      sandbox.stub(OVPAnalyticsService, 'trackEvent').callsFake((serviceUrl, params) => {
        if (params.eventType === KavaEventModel.IMPRESSION.index) {
          validateCommonParams(params, KavaEventModel.IMPRESSION.index);
          done();
        }
        return new RequestBuilder();
      });
      setupPlayer(config);
      kava = getKavaPlugin();
      player.play();
    });

    it('should send IMPRESSION event with playerJSLoadTime', done => {
      sandbox.stub(window.performance, 'getEntriesByType').callsFake(() => {
        return [
          {
            name: 'https://qa-apache-php7.dev.kaltura.com/p/1091/sp/109100/embedPlaykitJs/uiconf_id/15215933/partner_id/1091/versions/',
            entryType: 'resource',
            startTime: 118.6400000001413,
            duration: 149.8900000001413,
            initiatorType: 'script',
            nextHopProtocol: 'http/1.1',
            workerStart: 0,
            redirectStart: 0,
            redirectEnd: 0,
            fetchStart: 118.6400000001413,
            domainLookupStart: 0,
            domainLookupEnd: 0,
            connectStart: 0,
            connectEnd: 0,
            secureConnectionStart: 0,
            requestStart: 0,
            responseStart: 0,
            responseEnd: 268.5300000002826,
            transferSize: 0,
            encodedBodySize: 0,
            decodedBodySize: 0,
            serverTiming: []
          }
        ];
      });
      sandbox.stub(OVPAnalyticsService, 'trackEvent').callsFake((serviceUrl, params) => {
        if (params.eventType == KavaEventModel.IMPRESSION.index) {
          validateCommonParams(params, KavaEventModel.IMPRESSION.index);
          params.playerJSLoadTime.should.equal(149.89);
          done();
        }
        return new RequestBuilder();
      });

      let configClone = JSON.parse(JSON.stringify(config));
      configClone.plugins.kava.uiConfId = 15215933;
      setupPlayer(configClone);
      kava = getKavaPlugin();
      player.play();
    });

    it('should send PLAY_REQUEST event', done => {
      sandbox.stub(OVPAnalyticsService, 'trackEvent').callsFake((serviceUrl, params) => {
        if (params.eventType === KavaEventModel.PLAY_REQUEST.index) {
          validateCommonParams(params, KavaEventModel.PLAY_REQUEST.index);
          done();
        }
        return new RequestBuilder();
      });
      setupPlayer(config);
      kava = getKavaPlugin();
      player.play();
    });

    it('should send PLAY event', done => {
      sandbox.stub(OVPAnalyticsService, 'trackEvent').callsFake((serviceUrl, params) => {
        if (params.eventType === KavaEventModel.PLAY.index) {
          validateCommonParams(params, KavaEventModel.PLAY.index);
          params.bufferTime.should.exist;
          params.bufferTimeSum.should.exist;
          params.actualBitrate.should.exist;
          params.joinTime.should.exist;
          params.networkConnectionType.should.exist;
          done();
        }
        return new RequestBuilder();
      });
      setupPlayer(config);
      kava = getKavaPlugin();
      player.play();
    });

    it('should send RESUME event', done => {
      sandbox.stub(OVPAnalyticsService, 'trackEvent').callsFake((serviceUrl, params) => {
        if (params.eventType === KavaEventModel.RESUME.index) {
          validateCommonParams(params, KavaEventModel.RESUME.index);
          params.bufferTime.should.exist;
          params.bufferTimeSum.should.exist;
          params.actualBitrate.should.exist;
          done();
        }
        return new RequestBuilder();
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
        if (params.eventType === KavaEventModel.PAUSE.index) {
          validateCommonParams(params, KavaEventModel.PAUSE.index);
          kava._timer._stopped.should.be.true;
          done();
        }
        return new RequestBuilder();
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
        if (params.eventType === KavaEventModel.REPLAY.index) {
          validateCommonParams(params, KavaEventModel.REPLAY.index);
          done();
        }
        return new RequestBuilder();
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
        if (params.eventType === KavaEventModel.SEEK.index) {
          validateCommonParams(params, KavaEventModel.SEEK.index);
          params.targetPosition.should.exist;
          done();
        }
        return new RequestBuilder();
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
        if (params.eventType === KavaEventModel.PLAY_REACHED_25_PERCENT.index) {
          validateCommonParams(params, KavaEventModel.PLAY_REACHED_25_PERCENT.index);
          done();
        }
        return new RequestBuilder();
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
        if (params.eventType === KavaEventModel.PLAY_REACHED_50_PERCENT.index) {
          validateCommonParams(params, KavaEventModel.PLAY_REACHED_50_PERCENT.index);
          done();
        }
        return new RequestBuilder();
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
        if (params.eventType === KavaEventModel.PLAY_REACHED_75_PERCENT.index) {
          validateCommonParams(params, KavaEventModel.PLAY_REACHED_75_PERCENT.index);
          done();
        }
        return new RequestBuilder();
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
        if (params.eventType === KavaEventModel.PLAY_REACHED_100_PERCENT.index) {
          validateCommonParams(params, KavaEventModel.PLAY_REACHED_100_PERCENT.index);
          done();
        }
        return new RequestBuilder();
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
        if (params.eventType === KavaEventModel.SOURCE_SELECTED.index) {
          validateCommonParams(params, KavaEventModel.SOURCE_SELECTED.index);
          params.actualBitrate.should.equal(480256 / 1024);
          done();
        }
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
        if (params.eventType === KavaEventModel.FLAVOR_SWITCH.index) {
          validateCommonParams(params, KavaEventModel.FLAVOR_SWITCH.index);
          params.actualBitrate.should.equal(480256 / 1024);
          done();
        }
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
        if (params.eventType === KavaEventModel.AUDIO_SELECTED.index) {
          validateCommonParams(params, KavaEventModel.AUDIO_SELECTED.index);
          params.language.should.equal('heb');
          done();
        }
        return new RequestBuilder();
      });
      setupPlayer(config);
      kava = getKavaPlugin();
      kava._model.updateModel({language: 'heb'});
      kava._sendAnalytics(KavaEventModel.AUDIO_SELECTED);
    });

    it('should send CAPTIONS event', done => {
      sandbox.stub(OVPAnalyticsService, 'trackEvent').callsFake((serviceUrl, params) => {
        if (params.eventType === KavaEventModel.CAPTIONS.index) {
          validateCommonParams(params, KavaEventModel.CAPTIONS.index);
          params.caption.should.equal('eng');
          done();
        }
        return new RequestBuilder();
      });
      setupPlayer(config);
      kava = getKavaPlugin();
      kava._model.updateModel({caption: 'eng'});
      kava._sendAnalytics(KavaEventModel.CAPTIONS);
    });

    it('should send ERROR event', done => {
      sandbox.stub(OVPAnalyticsService, 'trackEvent').callsFake((serviceUrl, params) => {
        if (params.eventType === KavaEventModel.ERROR.index) {
          validateCommonParams(params, KavaEventModel.ERROR.index);
          params.errorCode.should.equal(200);
          done();
        }
        return new RequestBuilder();
      });
      setupPlayer(config);
      kava = getKavaPlugin();
      kava._model.updateModel({errorCode: 200});
      kava._sendAnalytics(KavaEventModel.ERROR);
    });

    it('should send VIEW event', done => {
      sandbox.stub(window.navigator.connection, 'effectiveType').value('2g');

      sandbox.stub(OVPAnalyticsService, 'trackEvent').callsFake((serviceUrl, params) => {
        try {
          if (params.eventType === KavaEventModel.VIEW.index) {
            validateCommonParams(params, KavaEventModel.VIEW.index);
            params.should.have.all.keys(
              'audioLanguage',
              'bufferTime',
              'bufferTimeSum',
              'actualBitrate',
              'averageBitrate',
              'captionsLanguage',
              'clientTag',
              'clientVer',
              'deliveryType',
              'droppedFramesRatio',
              'entryId',
              'eventIndex',
              'eventType',
              'ks',
              'partnerId',
              'playTimeSum',
              'playbackType',
              'playlistId',
              'position',
              'referrer',
              'sessionId',
              'soundMode',
              'tabMode',
              'networkConnectionType',
              'userId',
              'playbackSpeed'
            );
            params.networkConnectionType.should.equal('2g');
            params.tabMode.should.equal(TabMode.TAB_FOCUSED);
            params.soundMode.should.equal(SoundMode.SOUND_ON);
            done();
          }
          return new RequestBuilder();
        } catch (err) {
          done(err);
        }
      });
      setupPlayer(config);
      player.play();
    });

    it('should send first VIEW event with manifest download time, segment download time, bandwidth, networkConnectionOverhead', done => {
      const DUMMY_MANIFEST_DOWNLOAD_TIME = 57;
      const FRAG1_DOWNLOAD_TIME = 100;
      const FRAG2_DOWNLOAD_TIME = 20;
      const FRAG1_BYTES = 2000;
      const FRAG2_BYTES = 20000;
      sandbox.stub(OVPAnalyticsService, 'trackEvent').callsFake((serviceUrl, params) => {
        if (params.eventType === KavaEventModel.VIEW.index) {
          params.manifestDownloadTime.should.equal(DUMMY_MANIFEST_DOWNLOAD_TIME / 1000);
          const TOTAL_SECONDS = (FRAG1_DOWNLOAD_TIME + FRAG2_DOWNLOAD_TIME) / 1000;
          params.bandwidth.should.equal(Math.round(((FRAG1_BYTES + FRAG2_BYTES) * 8) / TOTAL_SECONDS) / 1000);
          params.segmentDownloadTime.should.equal(FRAG1_DOWNLOAD_TIME / 1000);
          params.networkConnectionOverhead.should.equal(0.1);
          params.flavorParamsId.should.equal(36);
          params.position.should.equal(0);
          done();
        }
        return new RequestBuilder();
      });
      setupPlayer(config);
      kava = getKavaPlugin();
      player.play();
      player.dispatchEvent(
        new FakeEvent(CustomEventType.TIMED_METADATA, {
          cues: [
            {
              value: {
                key: 'TEXT',
                data: '{"timestamp":1561448342872,"sequenceId":"36"}'
              },
              track: {
                label: 'id3'
              }
            }
          ]
        })
      );
      player.dispatchEvent(new FakeEvent(CustomEventType.MANIFEST_LOADED, {miliSeconds: DUMMY_MANIFEST_DOWNLOAD_TIME}));
      player.dispatchEvent(
        new FakeEvent(CustomEventType.FRAG_LOADED, {
          miliSeconds: FRAG1_DOWNLOAD_TIME,
          bytes: FRAG1_BYTES,
          url: 'http://www.somesite.com/movie.ts'
        })
      );
      player.dispatchEvent(
        new FakeEvent(CustomEventType.FRAG_LOADED, {miliSeconds: FRAG2_DOWNLOAD_TIME, bytes: FRAG2_BYTES, url: 'http://www.somesite.com/movie2.ts'})
      );
      let performanceOverserList = {};
      performanceOverserList.getEntries = () => {
        return [
          {
            name: 'http://www.somesite.com/movie.ts',
            entryType: 'resource',
            startTime: 118.6400000001413,
            duration: 149.8900000001413,
            initiatorType: 'script',
            nextHopProtocol: 'http/1.1',
            workerStart: 0,
            redirectStart: 0,
            redirectEnd: 0,
            fetchStart: 118.6400000001413,
            domainLookupStart: 20.2,
            domainLookupEnd: 0,
            connectStart: 0,
            connectEnd: 120.5,
            secureConnectionStart: 0,
            requestStart: 0,
            responseStart: 0,
            responseEnd: 268.5300000002826,
            transferSize: 0,
            encodedBodySize: 0,
            decodedBodySize: 0,
            serverTiming: []
          }
        ];
      };
      kava._handleNewPerformanceEntries(performanceOverserList);
    });

    it('should send VIEW event with volume set to 0', done => {
      sandbox.stub(OVPAnalyticsService, 'trackEvent').callsFake((serviceUrl, params) => {
        if (params.eventType === KavaEventModel.VIEW.index) {
          params.soundMode.should.equal(SoundMode.SOUND_OFF);
          done();
        }
        return new RequestBuilder();
      });
      setupPlayer(config);
      kava = getKavaPlugin();
      player.play();
      player.volume = 0;
    });

    it('should send timed VIEW event after 10 secs', done => {
      sandbox.stub(OVPAnalyticsService, 'trackEvent').callsFake((serviceUrl, params) => {
        if (params.eventType === KavaEventModel.VIEW.index) {
          params.position.should.gt(config.plugins.kava.viewEventCountdown);
          done();
        }
        return new RequestBuilder();
      });
      setupPlayer(config);
      kava = getKavaPlugin();
      player.play();
    });

    it('should send VIEW event with sound muted', done => {
      sandbox.stub(OVPAnalyticsService, 'trackEvent').callsFake((serviceUrl, params) => {
        if (params.eventType === KavaEventModel.VIEW.index) {
          params.soundMode.should.equal(SoundMode.SOUND_OFF);
          done();
        }
        return new RequestBuilder();
      });
      setupPlayer(config);
      kava = getKavaPlugin();
      player.play();
      player.muted = true;
    });

    it('should send VIEW event with forwardBufferHealth and targetBuffer', done => {
      sandbox.stub(OVPAnalyticsService, 'trackEvent').callsFake((serviceUrl, params) => {
        if (params.eventType === KavaEventModel.VIEW.index) {
          params.targetBuffer.should.equal(30);
          params.forwardBufferHealth.should.equal(0.5);
          done();
        }
        return new RequestBuilder();
      });
      setupPlayer(config);
      kava = getKavaPlugin();
      player.play();
      sandbox.stub(player, 'stats').get(() => {
        return {
          targetBuffer: 30,
          availableBuffer: 15
        };
      });
    });

    it('should send BUFFER_START event', done => {
      sandbox.stub(OVPAnalyticsService, 'trackEvent').callsFake((serviceUrl, params) => {
        if (params.eventType === KavaEventModel.BUFFER_START.index) {
          validateCommonParams(params, KavaEventModel.BUFFER_START.index);
          done();
        }
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
        if (params.eventType === KavaEventModel.BUFFER_END.index) {
          validateCommonParams(params, KavaEventModel.BUFFER_END.index);
          done();
        }
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
    it('should send SPEED event', done => {
      sandbox.stub(OVPAnalyticsService, 'trackEvent').callsFake((serviceUrl, params) => {
        if (params.eventType === KavaEventModel.SPEED.index) {
          validateCommonParams(params, KavaEventModel.SPEED.index);
          params.playbackSpeed.should.equal(1);
          done();
        }
        return new RequestBuilder();
      });
      setupPlayer(config);
      kava = getKavaPlugin();
      kava._onPlaybackRateChanged();
    });
  });

  describe('Server Response', () => {
    let sandbox;
    const config = {
      sources: {
        progressive: [
          {
            mimetype: 'video/mp4',
            url: 'https://cfvod.kaltura.com/pd/p/1740481/sp/174048100/serveFlavor/entryId/1_kbyh1guy/v/1/flavorId/1_hq6oztva/name/a.mp4'
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
      sandbox = sinon.createSandbox();
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
