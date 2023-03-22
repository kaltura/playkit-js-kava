# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.5.1](https://github.com/kaltura/playkit-js-kava/compare/v1.5.0...v1.5.1) (2023-03-22)


### Bug Fixes

* **FEC-13039:** ignore playbackRates not included in list ([#138](https://github.com/kaltura/playkit-js-kava/issues/138)) ([43e75e2](https://github.com/kaltura/playkit-js-kava/commit/43e75e2))



## [1.5.0](https://github.com/kaltura/playkit-js-kava/compare/v1.4.0...v1.5.0) (2023-02-22)


### Bug Fixes

* **FEC-12613:** Image Entry - Kava Analytics Events ([#135](https://github.com/kaltura/playkit-js-kava/issues/135)) ([a0a3c27](https://github.com/kaltura/playkit-js-kava/commit/a0a3c27))


### Features

* **FEC-12923:** Add missing applications data on kava  beacons & config ([#134](https://github.com/kaltura/playkit-js-kava/issues/134)) ([1c76ade](https://github.com/kaltura/playkit-js-kava/commit/1c76ade))



## [1.4.0](https://github.com/kaltura/playkit-js-kava/compare/v1.3.1...v1.4.0) (2023-01-26)


### Build System

* set prerelease false ([c461bf9](https://github.com/kaltura/playkit-js-kava/commit/c461bf9))


### Features

* **FEC-11600:** Related grid analytics ([#133](https://github.com/kaltura/playkit-js-kava/issues/133)) ([52dc4b2](https://github.com/kaltura/playkit-js-kava/commit/52dc4b2))



### [1.3.1](https://github.com/kaltura/playkit-js-kava/compare/v1.3.0...v1.3.1) (2022-03-23)


### Bug Fixes

* **FEC-11971:** when in PiP mode user is considered not engaged ([#115](https://github.com/kaltura/playkit-js-kava/issues/115)) ([645f9a6](https://github.com/kaltura/playkit-js-kava/commit/645f9a6))



## [1.3.0](https://github.com/kaltura/playkit-js-kava/compare/v1.2.2...v1.3.0) (2021-12-21)


### Features

* **FEC-11748:** adding player events for EP analytics ([#109](https://github.com/kaltura/playkit-js-kava/issues/109)) ([e9bf239](https://github.com/kaltura/playkit-js-kava/commit/e9bf239))



### [1.2.2](https://github.com/kaltura/playkit-js-kava/compare/v1.2.1...v1.2.2) (2021-10-27)


### Build System

* fix node 17 issue ([8745624](https://github.com/kaltura/playkit-js-kava/commit/8745624))



### [1.2.1](https://github.com/kaltura/playkit-js-kava/compare/v1.2.0...v1.2.1) (2021-10-27)


### Bug Fixes

* **FEC-11621:** analytics plugins send position 0 even startTime set ([#107](https://github.com/kaltura/playkit-js-kava/issues/107)) ([b1ba289](https://github.com/kaltura/playkit-js-kava/commit/b1ba289))


### Build System

* **FEC-10700:** Improvement for CI/CD ([#101](https://github.com/kaltura/playkit-js-kava/issues/101)) ([7c436e8](https://github.com/kaltura/playkit-js-kava/commit/7c436e8))
* **FEC-11389:** reduce builds from travis ([1a5d223](https://github.com/kaltura/playkit-js-kava/commit/1a5d223))


### Tests

* add start time unit tests ([#108](https://github.com/kaltura/playkit-js-kava/issues/108)) ([4777d8e](https://github.com/kaltura/playkit-js-kava/commit/4777d8e))



## [1.2.0](https://github.com/kaltura/playkit-js-kava/compare/v1.1.1...v1.2.0) (2021-01-28)


### Features

* **FEC-10709, FEC-10712:** player visibility - Auto-pause when player is out of view, Autoplay only when player is in view ([#91](https://github.com/kaltura/playkit-js-kava/issues/91)) ([6cdc4b1](https://github.com/kaltura/playkit-js-kava/commit/6cdc4b1))



### [1.1.1](https://github.com/kaltura/playkit-js-kava/compare/v1.1.0...v1.1.1) (2020-12-07)


### Bug Fixes

* **FEC-10635:** Add catch handler for Kava HTTP request ([#89](https://github.com/kaltura/playkit-js-kava/issues/89)) ([426e5f8](https://github.com/kaltura/playkit-js-kava/commit/426e5f8))



## [1.1.0](https://github.com/kaltura/playkit-js-kava/compare/v1.0.0...v1.1.0) (2020-11-03)


### Build System

* kava canary change provider dep to master ([#87](https://github.com/kaltura/playkit-js-kava/issues/87)) ([5c0ce96](https://github.com/kaltura/playkit-js-kava/commit/5c0ce96))
* remove plugins that already exist on preset-env ([#85](https://github.com/kaltura/playkit-js-kava/issues/85)) ([4c4e5cd](https://github.com/kaltura/playkit-js-kava/commit/4c4e5cd))


### Features

* **FEC-10615:** support sending Kava beacons as POST ([#86](https://github.com/kaltura/playkit-js-kava/issues/86)) ([5a9452c](https://github.com/kaltura/playkit-js-kava/commit/5a9452c))



<a name="1.0.0"></a>
# [1.0.0](https://github.com/kaltura/playkit-js-kava/compare/v0.18.0...v1.0.0) (2020-09-08)


### Bug Fixes

* **FEC-10161:** add kava analytics url from server response ([#82](https://github.com/kaltura/playkit-js-kava/issues/82)) ([2574aa4](https://github.com/kaltura/playkit-js-kava/commit/2574aa4))


### Features

* **FEC-10347:** expose kaltura player as a global variable instead of UMD ([#80](https://github.com/kaltura/playkit-js-kava/issues/80)) ([75421c8](https://github.com/kaltura/playkit-js-kava/commit/75421c8))
* **FEC-10376:** add full screen to screen mode on view events ([#79](https://github.com/kaltura/playkit-js-kava/issues/79)) ([cd73937](https://github.com/kaltura/playkit-js-kava/commit/cd73937))


### BREAKING CHANGES

* **FEC-10347:** This package is not UMD anymore



## [0.19.1](https://github.com/kaltura/playkit-js-kava/compare/v0.19.0...v0.19.1) (2020-09-07)



## [0.19.0](https://github.com/kaltura/playkit-js-kava/compare/v0.18.0...v0.19.0) (2020-09-07)


### Bug Fixes

* **FEC-10161:** add kava analytics url from server response ([#82](https://github.com/kaltura/playkit-js-kava/issues/82)) ([2574aa4](https://github.com/kaltura/playkit-js-kava/commit/2574aa4))


### Build System

* **FEC-10064:** add automatic release notes ([#83](https://github.com/kaltura/playkit-js-kava/issues/83)) ([e9fbceb](https://github.com/kaltura/playkit-js-kava/commit/e9fbceb))


### Features

* **FEC-10376:** add full screen to screen mode on view events ([#79](https://github.com/kaltura/playkit-js-kava/issues/79)) ([cd73937](https://github.com/kaltura/playkit-js-kava/commit/cd73937))


### Tests

* faster unit tests ([#81](https://github.com/kaltura/playkit-js-kava/issues/81)) ([d9fdba5](https://github.com/kaltura/playkit-js-kava/commit/d9fdba5))



## [0.18.0](https://github.com/kaltura/playkit-js-kava/compare/v0.17.1...v0.18.0) (2020-08-05)


### Features

* **FEC-10057:** move the plugin manager to kaltura player ([#76](https://github.com/kaltura/playkit-js-kava/issues/76)) ([6fcf12a](https://github.com/kaltura/playkit-js-kava/commit/6fcf12a))
* **FEC-10290:** upgrade NPM packages ([#77](https://github.com/kaltura/playkit-js-kava/issues/77)) ([d2d6388](https://github.com/kaltura/playkit-js-kava/commit/d2d6388))
* **FEC-10291:** migrate analytics plugins injection from kaltura Player to server ([#75](https://github.com/kaltura/playkit-js-kava/issues/75)) ([a237449](https://github.com/kaltura/playkit-js-kava/commit/a237449))



<a name="0.17.1"></a>
## [0.17.1](https://github.com/kaltura/playkit-js-kava/compare/v0.17.0...v0.17.1) (2020-04-13)



<a name="0.17.0"></a>
# [0.17.0](https://github.com/kaltura/playkit-js-kava/compare/v0.16.0...v0.17.0) (2020-04-13)


### Bug Fixes

* **FEC-9532:** droppedFramesRatio = NaN instead of being between 0 and 1 ([#69](https://github.com/kaltura/playkit-js-kava/issues/69)) ([36ae710](https://github.com/kaltura/playkit-js-kava/commit/36ae710))


### Features

* **FEC-9633:** send UUID with analytics events ([#70](https://github.com/kaltura/playkit-js-kava/issues/70)) ([fe9d834](https://github.com/kaltura/playkit-js-kava/commit/fe9d834))
* **FEC-9740:** add PRE_PLAY errorPosition to error report ([#67](https://github.com/kaltura/playkit-js-kava/issues/67)) ([fd83b8f](https://github.com/kaltura/playkit-js-kava/commit/fd83b8f))



<a name="0.16.0"></a>
# [0.16.0](https://github.com/kaltura/playkit-js-kava/compare/v0.15.1...v0.16.0) (2020-03-01)


### Features

* **FEC-9652:** report playbackSpeed and caption in all events ([#66](https://github.com/kaltura/playkit-js-kava/issues/66)) ([40b8250](https://github.com/kaltura/playkit-js-kava/commit/40b8250))



<a name="0.15.1"></a>
## [0.15.1](https://github.com/kaltura/playkit-js-kava/compare/v0.15.0...v0.15.1) (2020-01-29)



<a name="0.15.0"></a>
# [0.15.0](https://github.com/kaltura/playkit-js-kava/compare/v0.14.1...v0.15.0) (2020-01-29)


### Features

* **FEC-9566:** add errorPosition (pre-playing or mid-stream) to error reporting ([#65](https://github.com/kaltura/playkit-js-kava/issues/65)) ([4afbb26](https://github.com/kaltura/playkit-js-kava/commit/4afbb26))



<a name="0.14.1"></a>
## [0.14.1](https://github.com/kaltura/playkit-js-kava/compare/v0.14.0...v0.14.1) (2020-01-05)


### Bug Fixes

* **FEC-9575:** improve jointime calculation ([#63](https://github.com/kaltura/playkit-js-kava/issues/63)) ([c441a0e](https://github.com/kaltura/playkit-js-kava/commit/c441a0e))



<a name="0.14.0"></a>
# [0.14.0](https://github.com/kaltura/playkit-js-kava/compare/v0.13.0...v0.14.0) (2019-12-01)


### Bug Fixes

* **FEC-9485:** application version should be sent as applicationVer ([#59](https://github.com/kaltura/playkit-js-kava/issues/59)) ([498576b](https://github.com/kaltura/playkit-js-kava/commit/498576b))


### Features

* **FEC-9344:** adding playbackSpeed to view event ([#60](https://github.com/kaltura/playkit-js-kava/issues/60)) ([8eec2d9](https://github.com/kaltura/playkit-js-kava/commit/8eec2d9))
* **FEC-9345:** send view event on first play ([#61](https://github.com/kaltura/playkit-js-kava/issues/61)) ([53e16be](https://github.com/kaltura/playkit-js-kava/commit/53e16be))



<a name="0.13.0"></a>
# [0.13.0](https://github.com/kaltura/playkit-js-kava/compare/v0.12.0...v0.13.0) (2019-11-12)


### Features

* **FEC-9220:** QoE tidbits ([#51](https://github.com/kaltura/playkit-js-kava/issues/51)) ([36b952c](https://github.com/kaltura/playkit-js-kava/commit/36b952c))



<a name="0.12.0"></a>
# [0.12.0](https://github.com/kaltura/playkit-js-kava/compare/v0.11.3...v0.12.0) (2019-10-07)


### Features

* **FEC-9343:** add playback rate change event ([#50](https://github.com/kaltura/playkit-js-kava/issues/50)) ([79a93cc](https://github.com/kaltura/playkit-js-kava/commit/79a93cc))



<a name="0.11.3"></a>
## [0.11.3](https://github.com/kaltura/playkit-js-kava/compare/v0.11.2...v0.11.3) (2019-07-30)


### Bug Fixes

* **FEC-9269:** networkConnectionType is missing in PLAY event ([#47](https://github.com/kaltura/playkit-js-kava/issues/47)) ([248693f](https://github.com/kaltura/playkit-js-kava/commit/248693f))



<a name="0.11.2"></a>
## [0.11.2](https://github.com/kaltura/playkit-js-kava/compare/v0.11.1...v0.11.2) (2019-07-25)


### Bug Fixes

* **FEC-9247:** add userId to kava reports ([#45](https://github.com/kaltura/playkit-js-kava/issues/45)) ([cda7469](https://github.com/kaltura/playkit-js-kava/commit/cda7469))
* **FEC-9258:** Kaltura player tests fail when performanceObserver isn't defined ([#46](https://github.com/kaltura/playkit-js-kava/issues/46)) ([cab2327](https://github.com/kaltura/playkit-js-kava/commit/cab2327))



<a name="0.11.1"></a>
## [0.11.1](https://github.com/kaltura/playkit-js-kava/compare/v0.11.0...v0.11.1) (2019-07-21)


### Bug Fixes

* **FEC-9237:** add app protocol for kava plugin ([#43](https://github.com/kaltura/playkit-js-kava/issues/43)) ([d84257f](https://github.com/kaltura/playkit-js-kava/commit/d84257f))
* **FEC-9251:** the browser stuck after click Play button ([#44](https://github.com/kaltura/playkit-js-kava/issues/44)) ([9ba55f8](https://github.com/kaltura/playkit-js-kava/commit/9ba55f8))



<a name="0.11.0"></a>
# [0.11.0](https://github.com/kaltura/playkit-js-kava/compare/v0.10.0...v0.11.0) (2019-07-19)


### Bug Fixes

* **FEC-9231:** fix flavorParamsId in native hls ([#41](https://github.com/kaltura/playkit-js-kava/issues/41)) ([3d81294](https://github.com/kaltura/playkit-js-kava/commit/3d81294))


### Features

* **FEC-9224:** refactoring networkConnectionOverhead to use PerformanceObserver ([#42](https://github.com/kaltura/playkit-js-kava/issues/42)) ([8782126](https://github.com/kaltura/playkit-js-kava/commit/8782126))



<a name="0.10.0"></a>
# [0.10.0](https://github.com/kaltura/playkit-js-kava/compare/v0.7.1...v0.10.0) (2019-07-07)


### Features

* **FEC-8975:** adding QoS Data to enhance KAVA ([#35](https://github.com/kaltura/playkit-js-kava/issues/35)) ([e1e4eda](https://github.com/kaltura/playkit-js-kava/commit/e1e4eda))
* **FEC-8975:** QoS Kava Enhancements - leftovers ([#36](https://github.com/kaltura/playkit-js-kava/issues/36)) ([e10ab36](https://github.com/kaltura/playkit-js-kava/commit/e10ab36))
* **FEC-9071:** add errorDetails field to kava error reporting ([#34](https://github.com/kaltura/playkit-js-kava/issues/34)) ([67ca77e](https://github.com/kaltura/playkit-js-kava/commit/67ca77e))
* **FEC-9139:** adding flavorParamsId ([#37](https://github.com/kaltura/playkit-js-kava/issues/37)) ([0817b70](https://github.com/kaltura/playkit-js-kava/commit/0817b70))



<a name="0.9.0"></a>
# [0.9.0](https://github.com/kaltura/playkit-js-kava/compare/v0.8.0...v0.9.0) (2019-06-23)


### Features

* **FEC-8975:** QoS Kava Enhancements - leftovers ([#36](https://github.com/kaltura/playkit-js-kava/issues/36)) ([e10ab36](https://github.com/kaltura/playkit-js-kava/commit/e10ab36))



<a name="0.8.0"></a>
# [0.8.0](https://github.com/kaltura/playkit-js-kava/compare/v0.7.2...v0.8.0) (2019-06-16)


### Features

* **FEC-8975:** adding QoS Data to enhance KAVA ([#35](https://github.com/kaltura/playkit-js-kava/issues/35)) ([e1e4eda](https://github.com/kaltura/playkit-js-kava/commit/e1e4eda))
* **FEC-9071:** add errorDetails field to kava error reporting ([#34](https://github.com/kaltura/playkit-js-kava/issues/34)) ([67ca77e](https://github.com/kaltura/playkit-js-kava/commit/67ca77e))



<a name="0.7.2"></a>
## [0.7.2](https://github.com/kaltura/playkit-js-kava/compare/v0.7.1...v0.7.2) (2019-05-01)



<a name="0.7.1"></a>
## [0.7.1](https://github.com/kaltura/playkit-js-kava/compare/v0.7.0...v0.7.1) (2019-03-06)


### Reverts

* new joinTime calculation ([#31](https://github.com/kaltura/playkit-js-kava/issues/31)) ([#32](https://github.com/kaltura/playkit-js-kava/issues/32)) ([10dcfce](https://github.com/kaltura/playkit-js-kava/commit/10dcfce))



<a name="0.7.0"></a>
# [0.7.0](https://github.com/kaltura/playkit-js-kava/compare/v0.6.1...v0.7.0) (2019-02-27)


### Features

* **FEC-8803:** add 'canPlay' param to the 'play' event ([#31](https://github.com/kaltura/playkit-js-kava/issues/31)) ([6b1eab7](https://github.com/kaltura/playkit-js-kava/commit/6b1eab7))



<a name="0.6.1"></a>
## [0.6.1](https://github.com/kaltura/playkit-js-kava/compare/v0.6.0...v0.6.1) (2019-01-30)


### Bug Fixes

* **FEC-8606:** "Play 100%" event is not sent on IE11 Win7 ([#30](https://github.com/kaltura/playkit-js-kava/issues/30)) ([c13a3df](https://github.com/kaltura/playkit-js-kava/commit/c13a3df))



<a name="0.6.0"></a>
# [0.6.0](https://github.com/kaltura/playkit-js-kava/compare/v0.5.0...v0.6.0) (2019-01-24)


### Bug Fixes

* **FEC-8657:** add buffer start/end events ([#28](https://github.com/kaltura/playkit-js-kava/issues/28)) ([e87af3a](https://github.com/kaltura/playkit-js-kava/commit/e87af3a))


### Features

* **FEC-8337:** add captions and audio language to view events ([#29](https://github.com/kaltura/playkit-js-kava/issues/29)) ([420d690](https://github.com/kaltura/playkit-js-kava/commit/420d690))



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
