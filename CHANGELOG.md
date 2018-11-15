# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="0.5.1"></a>
## [0.5.1](https://github.com/kaltura/playkit-js-kava/compare/v0.5.0...v0.5.1) (2018-11-15)


### Bug Fixes

* **FEC-8657:** add buffer start/end events ([#28](https://github.com/kaltura/playkit-js-kava/issues/28)) ([e87af3a](https://github.com/kaltura/playkit-js-kava/commit/e87af3a))



<a name="0.5.0"></a>
# [0.5.0](https://github.com/kaltura/playkit-js-kava/compare/v0.4.0...v0.5.0) (2018-11-11)


### Features

* event model and event type API ([#27](https://github.com/kaltura/playkit-js-kava/issues/27)) ([0d47045](https://github.com/kaltura/playkit-js-kava/commit/0d47045))



<a name="0.4.0"></a>
# [0.4.0](https://github.com/kaltura/playkit-js-kava/compare/v0.3.0...v0.4.0) (2018-11-05)


### Features

* **FEC-8629:** add hooks to kava to enable analytics event tampering and sending custom events ([#26](https://github.com/kaltura/playkit-js-kava/issues/26)) ([fdcc08d](https://github.com/kaltura/playkit-js-kava/commit/fdcc08d))



<a name="0.3.0"></a>
# [0.3.0](https://github.com/kaltura/playkit-js-kava/compare/v0.2.7...v0.3.0) (2018-10-28)


### Features

* **FEC-8452:** playlist ([#25](https://github.com/kaltura/playkit-js-kava/issues/25)) ([d0363fe](https://github.com/kaltura/playkit-js-kava/commit/d0363fe))



<a name="0.2.7"></a>
## [0.2.7](https://github.com/kaltura/playkit-js-kava/compare/v0.2.6...v0.2.7) (2018-09-16)


### Bug Fixes

* use FIRST_PLAYING event instead of PLAYBACK_STARTED ([#24](https://github.com/kaltura/playkit-js-kava/issues/24)) ([3484b09](https://github.com/kaltura/playkit-js-kava/commit/3484b09))



<a name="0.2.6"></a>
## [0.2.6](https://github.com/kaltura/playkit-js-kava/compare/v0.2.5...v0.2.6) (2018-07-23)


### Bug Fixes

* **FEC-8414:** referrer should not be base64 encoded ([#20](https://github.com/kaltura/playkit-js-kava/issues/20)) ([5d52ca9](https://github.com/kaltura/playkit-js-kava/commit/5d52ca9))
* **FEC-8415:** kava should report bitrate in kbps ([#21](https://github.com/kaltura/playkit-js-kava/issues/21)) ([fc52347](https://github.com/kaltura/playkit-js-kava/commit/fc52347))



<a name="0.2.5"></a>
## [0.2.5](https://github.com/kaltura/playkit-js-kava/compare/v0.2.4...v0.2.5) (2018-07-02)


### Bug Fixes

* **FEC-8354:** When selecting Audio language and refresh the page, the display language returns to default (but actual audio proper) ([#18](https://github.com/kaltura/playkit-js-kava/issues/18)) ([eb70a1c](https://github.com/kaltura/playkit-js-kava/commit/eb70a1c))



<a name="0.2.4"></a>
## [0.2.4](https://github.com/kaltura/playkit-js-kava/compare/v0.2.3...v0.2.4) (2018-06-28)


### Bug Fixes

* **FEC-8322:** In view event the position and playTimeSum are not equal when stream playing continuously ([#17](https://github.com/kaltura/playkit-js-kava/issues/17)) ([1476ee2](https://github.com/kaltura/playkit-js-kava/commit/1476ee2))



<a name="0.2.3"></a>
## [0.2.3](https://github.com/kaltura/playkit-js-kava/compare/v0.2.2...v0.2.3) (2018-06-14)


### Bug Fixes

* **FEC-8313:** When playing audio entry playbackType is not "vod" ([#15](https://github.com/kaltura/playkit-js-kava/issues/15)) ([9f70dc6](https://github.com/kaltura/playkit-js-kava/commit/9f70dc6))
* **FEC-8317:** impression event and the followup events the position value is NAN ([#13](https://github.com/kaltura/playkit-js-kava/issues/13)) ([8afa119](https://github.com/kaltura/playkit-js-kava/commit/8afa119))
* **FEC-8320:** SOURCE_SELECTED event triggered on user selection of ABR mode ([#16](https://github.com/kaltura/playkit-js-kava/issues/16)) ([3ca02c8](https://github.com/kaltura/playkit-js-kava/commit/3ca02c8))



<a name="0.2.2"></a>
## [0.2.2](https://github.com/kaltura/playkit-js-kava/compare/v0.2.1...v0.2.2) (2018-06-13)


### Bug Fixes

* **FEC-8305:** In Live videos there are progress events sent (11-14)  ([#9](https://github.com/kaltura/playkit-js-kava/issues/9)) ([3f38242](https://github.com/kaltura/playkit-js-kava/commit/3f38242))
* **FEC-8306:** No 'Play request' events are sent in web ([#10](https://github.com/kaltura/playkit-js-kava/issues/10)) ([a78647f](https://github.com/kaltura/playkit-js-kava/commit/a78647f))
* **FEC-8307:** Error event is triggered also when non-critical event occurs ([#8](https://github.com/kaltura/playkit-js-kava/issues/8)) ([e6c0e0b](https://github.com/kaltura/playkit-js-kava/commit/e6c0e0b))
* **FEC-8308:** audio track changes are not reproted ([#7](https://github.com/kaltura/playkit-js-kava/issues/7)) ([295d2d3](https://github.com/kaltura/playkit-js-kava/commit/295d2d3))
* **FEC-8309:** playTimeSum value in View event is incorrect (not accumulative ([#11](https://github.com/kaltura/playkit-js-kava/issues/11)) ([e58a9e5](https://github.com/kaltura/playkit-js-kava/commit/e58a9e5))
* **FEC-8311:** Live with DVR - when seeking back (more then dvrThreshold) the playbackType is not "dvr" ([#12](https://github.com/kaltura/playkit-js-kava/issues/12)) ([7e7be8b](https://github.com/kaltura/playkit-js-kava/commit/7e7be8b))



<a name="0.2.1"></a>
## [0.2.1](https://github.com/kaltura/playkit-js-kava/compare/v0.2.0...v0.2.1) (2018-06-12)


### Bug Fixes

* **FEC-8304:** No VIEW events are sent ([#6](https://github.com/kaltura/playkit-js-kava/issues/6)) ([9a87321](https://github.com/kaltura/playkit-js-kava/commit/9a87321))



<a name="0.2.0"></a>

# [0.2.0](https://github.com/kaltura/playkit-js-kava/compare/v0.1.0...v0.2.0) (2018-06-11)

### Features

- **FEC-8296:** add applicationVersion and playbackContext ([#3](https://github.com/kaltura/playkit-js-kava/issues/3)) ([0252c59](https://github.com/kaltura/playkit-js-kava/commit/0252c59))
- **FEC-8297:** reset plugin on critical error ([#4](https://github.com/kaltura/playkit-js-kava/issues/4)) ([3a86cea](https://github.com/kaltura/playkit-js-kava/commit/3a86cea))

<a name="0.1.0"></a>

# 0.1.0 (2018-06-05)

### Bug Fixes

- change model delegates to be on the instance ([abe2b2f](https://github.com/kaltura/playkit-js-kava/commit/abe2b2f))
- set initial plugin version ([7bc3abb](https://github.com/kaltura/playkit-js-kava/commit/7bc3abb))
- sources.type protection ([faf5875](https://github.com/kaltura/playkit-js-kava/commit/faf5875))
- update sources type config ([3de325b](https://github.com/kaltura/playkit-js-kava/commit/3de325b))

### Features

- kava plugin ([#1](https://github.com/kaltura/playkit-js-kava/issues/1)) ([adf4609](https://github.com/kaltura/playkit-js-kava/commit/adf4609))
