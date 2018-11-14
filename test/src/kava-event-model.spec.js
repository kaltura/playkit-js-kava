import {KavaEventModel} from '../../src/kava-event-model';

class FakeModel {
  getPlayTimeSum() {
    return 10;
  }

  getBufferTime() {
    return 2;
  }

  getBufferTimeSum() {
    return 5;
  }

  getJoinTime() {
    return 12223;
  }

  getTargetPosition() {
    return 10.3;
  }

  getLanguage() {
    return 'eng';
  }

  getCaption() {
    return 'spa';
  }

  getErrorCode() {
    return 200;
  }

  getActualBitrate() {
    return 720;
  }

  getAverageBitrate() {
    return 600;
  }
}

describe('KavaEventModel', () => {
  const fakeModel = new FakeModel();

  it('VIEW', () => {
    KavaEventModel.VIEW.type.should.equal('VIEW');
    KavaEventModel.VIEW.index.should.equal(99);
    KavaEventModel.VIEW.getEventModel(fakeModel).should.deep.equal({
      playTimeSum: fakeModel.getPlayTimeSum(),
      bufferTime: fakeModel.getBufferTime(),
      bufferTimeSum: fakeModel.getBufferTimeSum(),
      actualBitrate: fakeModel.getActualBitrate(),
      averageBitrate: fakeModel.getAverageBitrate()
    });
  });

  it('IMPRESSION', () => {
    KavaEventModel.IMPRESSION.type.should.equal('IMPRESSION');
    KavaEventModel.IMPRESSION.index.should.equal(1);
    KavaEventModel.IMPRESSION.getEventModel(fakeModel).should.deep.equal({});
  });

  it('PLAY_REQUEST', () => {
    KavaEventModel.PLAY_REQUEST.type.should.equal('PLAY_REQUEST');
    KavaEventModel.PLAY_REQUEST.index.should.equal(2);
    KavaEventModel.PLAY_REQUEST.getEventModel(fakeModel).should.deep.equal({});
  });

  it('PLAY', () => {
    KavaEventModel.PLAY.type.should.equal('PLAY');
    KavaEventModel.PLAY.index.should.equal(3);
    KavaEventModel.PLAY.getEventModel(fakeModel).should.deep.equal({
      bufferTime: fakeModel.getBufferTime(),
      bufferTimeSum: fakeModel.getBufferTimeSum(),
      actualBitrate: fakeModel.getActualBitrate(),
      joinTime: fakeModel.getJoinTime()
    });
  });

  it('RESUME', () => {
    KavaEventModel.RESUME.type.should.equal('RESUME');
    KavaEventModel.RESUME.index.should.equal(4);
    KavaEventModel.RESUME.getEventModel(fakeModel).should.deep.equal({
      bufferTime: fakeModel.getBufferTime(),
      bufferTimeSum: fakeModel.getBufferTimeSum(),
      actualBitrate: fakeModel.getActualBitrate()
    });
  });

  it('PAUSE', () => {
    KavaEventModel.PAUSE.type.should.equal('PAUSE');
    KavaEventModel.PAUSE.index.should.equal(33);
    KavaEventModel.PAUSE.getEventModel(fakeModel).should.deep.equal({});
  });

  it('REPLAY', () => {
    KavaEventModel.REPLAY.type.should.equal('REPLAY');
    KavaEventModel.REPLAY.index.should.equal(34);
    KavaEventModel.REPLAY.getEventModel(fakeModel).should.deep.equal({});
  });

  it('SEEK', () => {
    KavaEventModel.SEEK.type.should.equal('SEEK');
    KavaEventModel.SEEK.index.should.equal(35);
    KavaEventModel.SEEK.getEventModel(fakeModel).should.deep.equal({
      targetPosition: fakeModel.getTargetPosition()
    });
  });

  it('PLAY_REACHED_25_PERCENT', () => {
    KavaEventModel.PLAY_REACHED_25_PERCENT.type.should.equal('PLAY_REACHED_25_PERCENT');
    KavaEventModel.PLAY_REACHED_25_PERCENT.index.should.equal(11);
    KavaEventModel.PLAY_REACHED_25_PERCENT.getEventModel(fakeModel).should.deep.equal({});
  });

  it('PLAY_REACHED_50_PERCENT', () => {
    KavaEventModel.PLAY_REACHED_50_PERCENT.type.should.equal('PLAY_REACHED_50_PERCENT');
    KavaEventModel.PLAY_REACHED_50_PERCENT.index.should.equal(12);
    KavaEventModel.PLAY_REACHED_50_PERCENT.getEventModel(fakeModel).should.deep.equal({});
  });

  it('PLAY_REACHED_75_PERCENT', () => {
    KavaEventModel.PLAY_REACHED_75_PERCENT.type.should.equal('PLAY_REACHED_75_PERCENT');
    KavaEventModel.PLAY_REACHED_75_PERCENT.index.should.equal(13);
    KavaEventModel.PLAY_REACHED_75_PERCENT.getEventModel(fakeModel).should.deep.equal({});
  });

  it('PLAY_REACHED_100_PERCENT', () => {
    KavaEventModel.PLAY_REACHED_100_PERCENT.type.should.equal('PLAY_REACHED_100_PERCENT');
    KavaEventModel.PLAY_REACHED_100_PERCENT.index.should.equal(14);
    KavaEventModel.PLAY_REACHED_100_PERCENT.getEventModel(fakeModel).should.deep.equal({});
  });

  it('SOURCE_SELECTED', () => {
    KavaEventModel.SOURCE_SELECTED.type.should.equal('SOURCE_SELECTED');
    KavaEventModel.SOURCE_SELECTED.index.should.equal(39);
    KavaEventModel.SOURCE_SELECTED.getEventModel(fakeModel).should.deep.equal({
      actualBitrate: fakeModel.getActualBitrate()
    });
  });

  it('AUDIO_SELECTED', () => {
    KavaEventModel.AUDIO_SELECTED.type.should.equal('AUDIO_SELECTED');
    KavaEventModel.AUDIO_SELECTED.index.should.equal(42);
    KavaEventModel.AUDIO_SELECTED.getEventModel(fakeModel).should.deep.equal({
      language: fakeModel.getLanguage()
    });
  });

  it('FLAVOR_SWITCH', () => {
    KavaEventModel.FLAVOR_SWITCH.type.should.equal('FLAVOR_SWITCH');
    KavaEventModel.FLAVOR_SWITCH.index.should.equal(43);
    KavaEventModel.FLAVOR_SWITCH.getEventModel(fakeModel).should.deep.equal({
      actualBitrate: fakeModel.getActualBitrate()
    });
  });

  it('CAPTIONS', () => {
    KavaEventModel.CAPTIONS.type.should.equal('CAPTIONS');
    KavaEventModel.CAPTIONS.index.should.equal(38);
    KavaEventModel.CAPTIONS.getEventModel(fakeModel).should.deep.equal({
      caption: fakeModel.getCaption()
    });
  });

  it('ERROR', () => {
    KavaEventModel.ERROR.type.should.equal('ERROR');
    KavaEventModel.ERROR.index.should.equal(98);
    KavaEventModel.ERROR.getEventModel(fakeModel).should.deep.equal({
      errorCode: fakeModel.getErrorCode()
    });
  });

  it('BUFFER_START', () => {
    KavaEventModel.BUFFER_START.type.should.equal('BUFFER_START');
    KavaEventModel.BUFFER_START.index.should.equal(45);
    KavaEventModel.BUFFER_START.getEventModel(fakeModel).should.deep.equal({});
  });

  it('BUFFER_END', () => {
    KavaEventModel.BUFFER_START.type.should.equal('BUFFER_END');
    KavaEventModel.BUFFER_START.index.should.equal(46);
    KavaEventModel.BUFFER_START.getEventModel(fakeModel).should.deep.equal({});
  });
});
