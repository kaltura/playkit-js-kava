import KavaRateHandler from '../../src/kava-rate-handler'

describe('KavaRateHandler', function () {
  let rateHandler;
  const data = [480, 720, 1080];

  beforeEach(function () {
    rateHandler = new KavaRateHandler();
    rateHandler.setRates(data);
  });

  afterEach(function () {
    rateHandler = null;
  });

  describe('getCurrent', () => {
    it('should return -1 if no active bitrate is setCurrentCurrent', () => {
      rateHandler.getCurrent().should.equal(-1);
    });

    it('should return 480 as current bitrate', () => {
      rateHandler.getCurrent().should.equal(-1);
      rateHandler._rates[0].active = true;
      rateHandler.getCurrent().should.equal(480);
    });

    it('should return 720 as current bitrate', () => {
      rateHandler.getCurrent().should.equal(-1);
      rateHandler._rates[1].active = true;
      rateHandler.getCurrent().should.equal(720);
    });

    it('should return 1080 as current bitrate', () => {
      rateHandler.getCurrent().should.equal(-1);
      rateHandler._rates[2].active = true;
      rateHandler.getCurrent().should.equal(1080);
    });
  });

  describe('setCurrent', () => {
    it('should return -1 if setCurrentCurrent invalid bitrate', () => {
      rateHandler.setCurrent(200);
      rateHandler.getCurrent().should.equal(-1);
    });

    it('should return -1 if setCurrentCurrent invalid type', () => {
      rateHandler.setCurrent(null);
      rateHandler.getCurrent().should.equal(-1);
      rateHandler.setCurrent(undefined);
      rateHandler.getCurrent().should.equal(-1);
      rateHandler.setCurrent('');
      rateHandler.getCurrent().should.equal(-1);
    });

    it('should set 480 as current bitrate', () => {
      rateHandler.setCurrent(480);
      rateHandler.getCurrent().should.equal(480);
    });

    it('should set 720 as current bitrate', () => {
      rateHandler.setCurrent(720);
      rateHandler.getCurrent().should.equal(720);
    });

    it('should set 1080 as current bitrate', () => {
      rateHandler.setCurrent(1080);
      rateHandler.getCurrent().should.equal(1080);
    });

    it('should set the zero bitrate', () => {
      rateHandler.setCurrent(0);
      rateHandler.getCurrent().should.equal(0);
    });
  });

  describe('getAverage', () => {
    it('should return getAverage bitrate 1', () => {
      rateHandler._rates[0].duration = 5;
      rateHandler._rates[1].duration = 3;
      rateHandler._rates[2].duration = 2;
      rateHandler._rates[0].active = true;
      rateHandler.getAverage().should.equal(672);
    });

    it('should return getAverage bitrate 2', () => {
      rateHandler._rates[0].duration = 20;
      rateHandler._rates[1].duration = 0;
      rateHandler._rates[2].duration = 50;
      rateHandler._rates[0].active = true;
      rateHandler.getAverage().should.equal(908.5714285714286);
    });
  });

  describe('reset', () => {
    it('should return 0 for getAverage after reset', () => {
      rateHandler._rates[0].duration = 5;
      rateHandler._rates[1].duration = 3;
      rateHandler._rates[2].duration = 2;
      rateHandler._rates[0].active = true;
      rateHandler.reset();
      rateHandler.getCurrent().should.equal(480);
      rateHandler.getAverage().should.equal(0);
    });

    it('should return 480 for getAverage after reset', () => {
      rateHandler._rates[0].duration = 20;
      rateHandler._rates[1].duration = 0;
      rateHandler._rates[2].duration = 50;
      rateHandler._rates[0].active = true;
      rateHandler.reset();
      rateHandler.getCurrent().should.equal(480);
      rateHandler._rates[0].duration = 10;
      rateHandler.getAverage().should.equal(480);
    });
  });

  describe('destroy', () => {
    it('should destroy the rate handler', () => {
      rateHandler._rates[0].duration = 5;
      rateHandler._rates[1].duration = 3;
      rateHandler._rates[2].duration = 2;
      rateHandler._rates[0].active = true;
      rateHandler.destroy();
      rateHandler.getCurrent().should.equal(-1);
      rateHandler.getAverage().should.equal(0);
    });
  });

  describe('countCurrent', () => {
    it('should not countCurrent if no current bitrate', () => {
      rateHandler.countCurrent();
      rateHandler._rates.forEach(o => {
        o.duration.should.equal(0);
      });
    });

    it('should countCurrent the current bitrate', () => {
      rateHandler.setCurrent(480);
      rateHandler.countCurrent();
      rateHandler._rates[0].duration.should.equal(1);
      rateHandler.countCurrent();
      rateHandler._rates[0].duration.should.equal(2);
      rateHandler.getAverage().should.equal(480);

      rateHandler.setCurrent(720);
      rateHandler.countCurrent();
      rateHandler._rates[1].duration.should.equal(1);
      rateHandler._rates[0].duration.should.equal(2);
      rateHandler.getAverage().should.equal(560);
    });
  });
});
