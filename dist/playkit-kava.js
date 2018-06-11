!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("playkit-js")):"function"==typeof define&&define.amd?define(["playkit-js"],t):"object"==typeof exports?exports.kava=t(require("playkit-js")):(e.KalturaPlayer=e.KalturaPlayer||{},e.KalturaPlayer.plugins=e.KalturaPlayer.plugins||{},e.KalturaPlayer.plugins.kava=t(e.KalturaPlayer.core))}("undefined"!=typeof self?self:this,function(e){return function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=3)}([function(t,n){t.exports=e},function(e,t,n){"use strict";function r(e,t){var n={eventType:e.index,partnerId:t.getPartnerId(),entryId:t.getEntryId(),sessionId:t.getSessionId(),eventIndex:t.getEventIndex(),referrer:t.getReferrer(),deliveryType:t.getDeliveryType(),playbackType:t.getPlaybackType(),clientVer:t.getClientVer(),clientTag:t.getClientTag(),position:t.getPosition()};t.getSessionStartTime()&&(n.sessionStartTime=t.getSessionStartTime()),t.getKS()&&(n.ks=t.getKS()),t.getUIConfId()&&(n.uiConfId=t.getUIConfId()),t.getCustomVar1()&&(n.customVar1=t.getCustomVar1()),t.getCustomVar2()&&(n.customVar2=t.getCustomVar2()),t.getCustomVar3()&&(n.customVar3=t.getCustomVar3()),t.getPlaybackContext()&&(n.playbackContext=t.getPlaybackContext()),t.getApplicationVersion()&&(n.applicationVersion=t.getApplicationVersion());var r=e.getEventModel(t);return Object.assign(r,n)}Object.defineProperty(t,"__esModule",{value:!0}),t.KavaEventModel=void 0,t.getEventModel=r;var i=n(2);(function(e){e&&e.__esModule})(i),t.KavaEventModel={VIEW:{type:"VIEW",index:99,getEventModel:function(e){return{playTimeSum:e.getPlayTimeSum(),bufferTime:e.getBufferTime(),bufferTimeSum:e.getBufferTimeSum(),actualBitrate:e.getActualBitrate(),averageBitrate:e.getAverageBitrate()}}},IMPRESSION:{type:"IMPRESSION",index:1,getEventModel:function(){return{}}},PLAY_REQUEST:{type:"PLAY_REQUEST",index:2,getEventModel:function(){return{}}},PLAY:{type:"PLAY",index:3,getEventModel:function(e){return{bufferTime:e.getBufferTime(),bufferTimeSum:e.getBufferTimeSum(),actualBitrate:e.getActualBitrate(),joinTime:e.getJoinTime()}}},RESUME:{type:"RESUME",index:4,getEventModel:function(e){return{bufferTime:e.getBufferTime(),bufferTimeSum:e.getBufferTimeSum(),actualBitrate:e.getActualBitrate()}}},PAUSE:{type:"PAUSE",index:33,getEventModel:function(){return{}}},REPLAY:{type:"REPLAY",index:34,getEventModel:function(){return{}}},SEEK:{type:"SEEK",index:35,getEventModel:function(e){return{targetPosition:e.getTargetPosition()}}},PLAY_REACHED_25_PERCENT:{type:"PLAY_REACHED_25_PERCENT",index:11,getEventModel:function(){return{}}},PLAY_REACHED_50_PERCENT:{type:"PLAY_REACHED_50_PERCENT",index:12,getEventModel:function(){return{}}},PLAY_REACHED_75_PERCENT:{type:"PLAY_REACHED_75_PERCENT",index:13,getEventModel:function(){return{}}},PLAY_REACHED_100_PERCENT:{type:"PLAY_REACHED_100_PERCENT",index:14,getEventModel:function(){return{}}},SOURCE_SELECTED:{type:"SOURCE_SELECTED",index:39,getEventModel:function(e){return{actualBitrate:e.getActualBitrate()}}},AUDIO_SELECTED:{type:"AUDIO_SELECTED",index:42,getEventModel:function(e){return{language:e.getLanguage()}}},FLAVOR_SWITCH:{type:"FLAVOR_SWITCH",index:43,getEventModel:function(e){return{actualBitrate:e.getActualBitrate()}}},CAPTIONS:{type:"CAPTIONS",index:38,getEventModel:function(e){return{caption:e.getCaption()}}},ERROR:{type:"ERROR",index:98,getEventModel:function(e){return{errorCode:e.getErrorCode()}}}}},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(1),a=function(){function e(t){r(this,e),t&&this.updateModel(t)}return i(e,[{key:"getPlayTimeSum",value:function(){return this.playTimeSum}},{key:"getBufferTime",value:function(){return this.bufferTime}},{key:"getBufferTimeSum",value:function(){return this.bufferTimeSum}},{key:"getJoinTime",value:function(){return this.joinTime}},{key:"getTargetPosition",value:function(){return this.targetPosition}},{key:"getLanguage",value:function(){return this.language}},{key:"getCaption",value:function(){return this.caption}},{key:"getErrorCode",value:function(){return this.errorCode}},{key:"getEventIndex",value:function(){return this.eventIndex}},{key:"getSessionStartTime",value:function(){return this.sessionStartTime}},{key:"updateModel",value:function(e){Object.assign(this,e)}},{key:"getModel",value:function(e){return(0,o.getEventModel)(e,this)}}]),e}();t.default=a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.NAME=t.VERSION=void 0;var r=n(0),i=n(4),o=function(e){return e&&e.__esModule?e:{default:e}}(i);t.default=o.default,t.VERSION="0.2.0",t.NAME="playkit-js-kava";(0,r.registerPlugin)("kava",o.default)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(0),c=n(5),f=n(1),d=n(6),v=r(d),p=n(7),y=r(p),h=n(2),_=r(h),g=function(e){function t(e,n,r){i(this,t);var a=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n,r));return a._rateHandler=new v.default,a._model=new _.default,a._setModelDelegates(),a._timer=new y.default({resetCounter:a.config.resetSessionCountdown,eventCounter:a.config.viewEventCountdown}),a._viewEventEnabled=!0,a._resetFlags(),a._addBindings(),a._model.updateModel({eventIndex:1,bufferTime:0,bufferTimeSum:0,playTimeSum:0}),a}return a(t,e),s(t,null,[{key:"isValid",value:function(){return!0}}]),s(t,[{key:"destroy",value:function(){this.eventManager.destroy(),this._timer.destroy(),this._rateHandler.destroy()}},{key:"reset",value:function(){this.eventManager.removeAll(),this._rateHandler.destroy(),this._timer.destroy(),this._resetFlags(),this._addBindings(),this._model.updateModel({eventIndex:1,bufferTime:0,bufferTimeSum:0,playTimeSum:0,sessionStartTime:null})}},{key:"_resetFlags",value:function(){this._previousCurrentTime=0,this._isFirstPlay=!0,this._isEnded=!1,this._isPaused=!1,this._isBuffering=!1,this._timePercentEvent={PLAY_REACHED_25_PERCENT:!1,PLAY_REACHED_50_PERCENT:!1,PLAY_REACHED_75_PERCENT:!1,PLAY_REACHED_100_PERCENT:!1}}},{key:"_resetSession",value:function(){this.logger.debug("Reset KAVA session"),this._rateHandler.reset(),this._model.updateModel({eventIndex:1,bufferTimeSum:0,playTimeSum:0})}},{key:"_sendAnalytics",value:function(e){var t=this;if(this._validate()){this._updatePlayTimeSumModel(),this._isBuffering&&(this._updateBufferModel(),this._bufferStartTime=Date.now());var n=this._model.getModel(e);c.OVPAnalyticsService.trackEvent(this.config.serviceUrl,n).doHttpRequest().then(function(r){t.logger.debug("KAVA event sent",e.type,n),t._updateSessionStartTimeModel(r)},function(r){t.logger.error("Failed to send KAVA event",e.type,n,r)}),this._model.updateModel({eventIndex:this._model.getEventIndex()+1})}}},{key:"_addBindings",value:function(){var e=this;this.eventManager.listen(this._timer,y.default.Event.TICK,function(){return e._rateHandler.countCurrent()}),this.eventManager.listen(this._timer,y.default.Event.REPORT,function(){return e._onReport()}),this.eventManager.listen(this._timer,y.default.Event.RESET,function(){return e._resetSession()}),this.eventManager.listen(this.player,this.player.Event.SOURCE_SELECTED,function(){return e._onSourceSelected()}),this.eventManager.listen(this.player,this.player.Event.ERROR,function(t){return e._onError(t)}),this.player.ready().then(function(){e._setInitialTracks(),e.eventManager.listen(e.player,e.player.Event.PLAYING,function(){return e._onPlaying()}),e.eventManager.listen(e.player,e.player.Event.FIRST_PLAY,function(){return e._onFirstPlay()}),e.eventManager.listen(e.player,e.player.Event.SEEKING,function(){return e._onSeeking()}),e.eventManager.listen(e.player,e.player.Event.PAUSE,function(){return e._onPause()}),e.eventManager.listen(e.player,e.player.Event.ENDED,function(){return e._onEnded()}),e.eventManager.listen(e.player,e.player.Event.TIME_UPDATE,function(){return e._onTimeUpdate()}),e.eventManager.listen(e.player,e.player.Event.VIDEO_TRACK_CHANGED,function(t){return e._onVideoTrackChanged(t)}),e.eventManager.listen(e.player,e.player.Event.ABR_MODE_CHANGED,function(t){return e._onAbrModeChanged(t)}),e.eventManager.listen(e.player,e.player.Event.AUDIO_TRACK_CHANGED,function(t){return e._onAudioTrackChanged(t)}),e.eventManager.listen(e.player,e.player.Event.TEXT_TRACK_CHANGED,function(t){return e._onTextTrackChanged(t)}),e.eventManager.listen(e.player,e.player.Event.PLAYER_STATE_CHANGED,function(t){return e._onPlayerStateChanged(t)})})}},{key:"_getRates",value:function(){var e=[];return this.player.getTracks(this.player.Track.VIDEO).forEach(function(t){return e.push(t.bandwidth)}),e}},{key:"_setInitialTracks",value:function(){var e=this._getRates(),t=this.player.getActiveTracks();this._rateHandler.setRates(e),this._rateHandler.setCurrent(t.video.bandwidth),t.audio&&this._model.updateModel({language:t.audio.language}),t.text&&this._model.updateModel({caption:t.text.language})}},{key:"_onReport",value:function(){this._viewEventEnabled?this._sendAnalytics(f.KavaEventModel.VIEW):this.logger.warn("VIEW event blocked because server response of viewEventsEnabled=false"),this._model.updateModel({bufferTime:0})}},{key:"_onPlaying",value:function(){this._isFirstPlay?(this._timer.start(),this._isFirstPlay=!1,this._model.updateModel({joinTime:t._getTimeDifferenceInSeconds(this._firstPlayRequestTime)}),this._sendAnalytics(f.KavaEventModel.PLAY)):this._isEnded?(this._timer.start(),this._isEnded=!1,this._sendAnalytics(f.KavaEventModel.REPLAY)):this._isPaused&&(this._timer.resume(),this._isPaused=!1,this._sendAnalytics(f.KavaEventModel.RESUME))}},{key:"_onFirstPlay",value:function(){this._firstPlayRequestTime=Date.now(),this._sendAnalytics(f.KavaEventModel.PLAY_REQUEST)}},{key:"_onSourceSelected",value:function(){this._sendAnalytics(f.KavaEventModel.IMPRESSION)}},{key:"_onSeeking",value:function(){this._previousCurrentTime=this.player.currentTime,this._model.updateModel({targetPosition:this.player.currentTime}),this._sendAnalytics(f.KavaEventModel.SEEK)}},{key:"_onPause",value:function(){this._isPaused=!0,this._timer.stop(),this._sendAnalytics(f.KavaEventModel.PAUSE)}},{key:"_onEnded",value:function(){this._isEnded=!0,this._onTimeUpdate(),this._model.updateModel({bufferTime:0})}},{key:"_onTimeUpdate",value:function(){this._updatePlayTimeSumModel();var e=this.player.currentTime/this.player.duration;!this._timePercentEvent.PLAY_REACHED_25&&e>=.25&&(this._timePercentEvent.PLAY_REACHED_25=!0,this._sendAnalytics(f.KavaEventModel.PLAY_REACHED_25_PERCENT)),!this._timePercentEvent.PLAY_REACHED_50&&e>=.5&&(this._timePercentEvent.PLAY_REACHED_50=!0,this._sendAnalytics(f.KavaEventModel.PLAY_REACHED_50_PERCENT)),!this._timePercentEvent.PLAY_REACHED_75&&e>=.75&&(this._timePercentEvent.PLAY_REACHED_75=!0,this._sendAnalytics(f.KavaEventModel.PLAY_REACHED_75_PERCENT)),this._timePercentEvent.PLAY_REACHED_100||1!==e||(this._timePercentEvent.PLAY_REACHED_100=!0,this._sendAnalytics(f.KavaEventModel.PLAY_REACHED_100_PERCENT))}},{key:"_onVideoTrackChanged",value:function(e){var t=e.payload.selectedVideoTrack;this._rateHandler.setCurrent(t.bandwidth),this.player.isAdaptiveBitrateEnabled()?this._sendAnalytics(f.KavaEventModel.FLAVOR_SWITCH):this._sendAnalytics(f.KavaEventModel.SOURCE_SELECTED)}},{key:"_onAbrModeChanged",value:function(e){e.payload.mode===this.player.AbrMode.AUTO&&(this._rateHandler.setCurrent(0),this._sendAnalytics(f.KavaEventModel.SOURCE_SELECTED))}},{key:"_onAudioTrackChanged",value:function(e){var t=e.payload.selectedVideoTrack;this._model.updateModel({language:t.language}),this._sendAnalytics(f.KavaEventModel.AUDIO_SELECTED)}},{key:"_onTextTrackChanged",value:function(e){var t=e.payload.selectedTextTrack;this._model.updateModel({caption:t.language}),this._sendAnalytics(f.KavaEventModel.CAPTIONS)}},{key:"_onError",value:function(e){this._model.updateModel({errorCode:e.payload.code}),this._sendAnalytics(f.KavaEventModel.ERROR),e.payload&&e.payload.severity===l.Error.Severity.CRITICAL&&this.reset()}},{key:"_onPlayerStateChanged",value:function(e){var t=e.payload.oldState,n=e.payload.newState;t.type===this.player.State.BUFFERING&&(this._isBuffering=!1,this._updateBufferModel()),n.type===this.player.State.BUFFERING&&(this._isBuffering=!0,this._bufferStartTime=Date.now())}},{key:"_updateSessionStartTimeModel",value:function(e){!this._model.getSessionStartTime()&&e&&("object"===(void 0===e?"undefined":u(e))?(this._model.updateModel({sessionStartTime:e.time}),this._viewEventEnabled=e.viewEventEnabled):this._model.updateModel({sessionStartTime:e})),this._timer.isStopped()&&this._model.updateModel({sessionStartTime:null})}},{key:"_updateBufferModel",value:function(){var e=t._getTimeDifferenceInSeconds(this._bufferStartTime);this._model.updateModel({bufferTime:this._model.getBufferTime()+e,bufferTimeSum:this._model.getBufferTimeSum()+e})}},{key:"_updatePlayTimeSumModel",value:function(){var e=this.player.currentTime-this._previousCurrentTime;this._model.updateModel({playTimeSum:this._model.getPlayTimeSum()+e}),this._previousCurrentTime=this.player.currentTime}},{key:"_setModelDelegates",value:function(){var e=this;this._model.getActualBitrate=function(){return e._rateHandler.getCurrent()},this._model.getAverageBitrate=function(){return e._rateHandler.getAverage()},this._model.getPartnerId=function(){return e.config.partnerId},this._model.getEntryId=function(){return e.config.entryId},this._model.getSessionId=function(){return e.config.sessionId},this._model.getClientVer=function(){return e.config.playerVersion},this._model.getClientTag=function(){return"html5:v"+e.config.playerVersion},this._model.getKS=function(){return e.config.ks},this._model.getUIConfId=function(){return e.config.uiConfId},this._model.getReferrer=function(){return btoa(e.config.referrer)},this._model.getCustomVar1=function(){return e.config.customVar1},this._model.getCustomVar2=function(){return e.config.customVar2},this._model.getCustomVar3=function(){return e.config.customVar3},this._model.getPosition=function(){return e._getPosition()},this._model.getDeliveryType=function(){return e._getDeliveryType()},this._model.getPlaybackType=function(){return e._getPlaybackType()},this._model.getPlaybackContext=function(){return e.config.playbackContext},this._model.getApplicationVersion=function(){return e.config.applicationVersion}}},{key:"_getPosition",value:function(){return this.player.isLive()?this.player.duration-this.player.currentTime<1?0:-(this.player.duration-this.player.currentTime):this.player.currentTime}},{key:"_getDeliveryType",value:function(){return this.player.streamType===this.player.StreamType.PROGRESSIVE?"url":this.player.streamType}},{key:"_getPlaybackType",value:function(){if(this.player.isLive()&&this.player.isDvr()){if(this.player.duration-this.player.currentTime>=this.config.dvrThreshold)return"dvr"}return this.player.config.sources.type?this.player.config.sources.type.toString().toLowerCase():""}},{key:"_validate",value:function(){return this.config.partnerId?!!this.config.entryId||(t._logMissingParam("entryId"),!1):(t._logMissingParam("partnerId"),!1)}}],[{key:"_getTimeDifferenceInSeconds",value:function(e){return(Date.now()-e)/1e3}},{key:"_logMissingParam",value:function(e){this.logger.warn("Kava analytics block report because of missing param "+e)}}]),t}(l.BasePlugin);g.defaultConfig={serviceUrl:"//analytics.kaltura.com/api_v3/index.php",viewEventCountdown:10,resetSessionCountdown:30,dvrThreshold:12e4,playbackContext:"",applicationVersion:""},t.default=g},function(e,t,n){!function(t,n){e.exports=n()}(0,function(){return function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=15)}([function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new Map;r(this,e),this.headers=t}return o(e,[{key:"getUrl",value:function(e){return e+"/service/"+this.service+(this.action?"/action/"+this.action:"")}},{key:"doHttpRequest",value:function(){var e=this;if(!this.url)throw new Error("serviceUrl is mandatory for request builder");var t=new XMLHttpRequest;return new Promise(function(n,r){t.onreadystatechange=function(){if(4===t.readyState)if(200===t.status){var e=JSON.parse(t.responseText);e&&"object"===(void 0===e?"undefined":i(e))&&e.code&&e.message?r(e):n(e)}else r(t.responseText)},t.open(e.method,e.url),e.headers.forEach(function(e,n){t.setRequestHeader(n,e)}),t.send(e.params)})}}]),e}();t.default=a},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.OVPConfiguration=void 0;var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(4),a={serviceUrl:"https://cdnapisec.kaltura.com",cdnUrl:"//cdnapisec.kaltura.com",serviceParams:{apiVersion:"3.3.0",format:1}},u=function(){function e(){r(this,e)}return i(e,null,[{key:"set",value:function(e){e&&Object.assign(a,e)}},{key:"get",value:function(){return(0,o.clone)(a)}}]),e}();t.default=u,t.OVPConfiguration=u},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function e(t){r(this,e),this.hasError=!1,"KalturaAPIException"===t.objectType?(this.hasError=!0,this.error=new o(t.code,t.message)):t.error&&"KalturaAPIException"===t.error.objectType?(this.hasError=!0,this.error=new o(t.error.code,t.error.message)):this.data=t};t.default=i;var o=function e(t,n){r(this,e),this.code=t,this.message=n}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.MultiRequestResult=void 0;var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(0),c=r(l),f=n(5),d=r(f),v=n(2),p=r(v),y=function(e){function t(){var e,n,r,i;o(this,t);for(var u=arguments.length,s=Array(u),l=0;l<u;l++)s[l]=arguments[l];return n=r=a(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(s))),r.requests=[],i=n,a(r,i)}return u(t,e),s(t,[{key:"add",value:function(e){this.requests.push(e);var t={},n={service:e.service,action:e.action};return Object.assign(t,i({},this.requests.length,Object.assign(n,e.params))),Object.assign(t,this.params),this.params=t,this}},{key:"execute",value:function(){var e=this;try{this.params=JSON.stringify(this.params)}catch(e){t._logger.error(""+e.message)}return new Promise(function(t,n){e.doHttpRequest().then(function(e){t(new h(e))},function(e){n("Error on multiRequest execution, error <"+e+">.")})})}}]),t}(c.default);y._logger=(0,d.default)("MultiRequestBuilder"),t.default=y;var h=t.MultiRequestResult=function e(t){var n=this;o(this,e),this.results=[],this.success=!0,(t.result?t.result:t).forEach(function(t){var r=new p.default(t);if(n.results.push(r),r.hasError)return e._logger.error("Service returned an error with error code: "+r.error.code+" and message: "+r.error.message+"."),void(n.success=!1)})};h._logger=(0,d.default)("MultiRequestResult")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i=function e(t){var n=void 0;return Array.isArray(t)?(n=t.length>0?t.slice(0):[],n.forEach(function(t,i){("object"===(void 0===t?"undefined":r(t))&&t!=={}||Array.isArray(t)&&t.length>0)&&(n[i]=e(t))})):"object"===(void 0===t?"undefined":r(t))?(n=Object.assign({},t),Object.keys(n).forEach(function(t){("object"===r(n[t])&&n[t]!=={}||Array.isArray(n[t])&&n[t].length>0)&&(n[t]=e(n[t]))})):n=t,n};t.clone=i},function(e,t,n){"use strict";function r(e){return e?u.get(e):u}function i(e){return r(e).getLevel()}function o(e,t){r(t).setLevel(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.setLogLevel=t.getLogLevel=t.LogLevel=void 0;var a=n(6),u=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(a),s={DEBUG:u.DEBUG,INFO:u.INFO,TIME:u.TIME,WARN:u.WARN,ERROR:u.ERROR,OFF:u.OFF};u.useDefaults({defaultLevel:u.ERROR}),t.default=r,t.LogLevel=s,t.getLogLevel=i,t.setLogLevel=o},function(e,t,n){var r,i;/*!
 * js-logger - http://github.com/jonnyreeves/js-logger
 * Jonny Reeves, http://jonnyreeves.co.uk/
 * js-logger may be freely distributed under the MIT license.
 */
!function(o){"use strict";var a={};a.VERSION="1.4.1";var u,s={},l=function(e,t){return function(){return t.apply(e,arguments)}},c=function(){var e,t,n=arguments,r=n[0];for(t=1;t<n.length;t++)for(e in n[t])e in r||!n[t].hasOwnProperty(e)||(r[e]=n[t][e]);return r},f=function(e,t){return{value:e,name:t}};a.DEBUG=f(1,"DEBUG"),a.INFO=f(2,"INFO"),a.TIME=f(3,"TIME"),a.WARN=f(4,"WARN"),a.ERROR=f(8,"ERROR"),a.OFF=f(99,"OFF");var d=function(e){this.context=e,this.setLevel(e.filterLevel),this.log=this.info};d.prototype={setLevel:function(e){e&&"value"in e&&(this.context.filterLevel=e)},getLevel:function(){return this.context.filterLevel},enabledFor:function(e){var t=this.context.filterLevel;return e.value>=t.value},debug:function(){this.invoke(a.DEBUG,arguments)},info:function(){this.invoke(a.INFO,arguments)},warn:function(){this.invoke(a.WARN,arguments)},error:function(){this.invoke(a.ERROR,arguments)},time:function(e){"string"==typeof e&&e.length>0&&this.invoke(a.TIME,[e,"start"])},timeEnd:function(e){"string"==typeof e&&e.length>0&&this.invoke(a.TIME,[e,"end"])},invoke:function(e,t){u&&this.enabledFor(e)&&u(t,c({level:e},this.context))}};var v=new d({filterLevel:a.OFF});!function(){var e=a;e.enabledFor=l(v,v.enabledFor),e.debug=l(v,v.debug),e.time=l(v,v.time),e.timeEnd=l(v,v.timeEnd),e.info=l(v,v.info),e.warn=l(v,v.warn),e.error=l(v,v.error),e.log=e.info}(),a.setHandler=function(e){u=e},a.setLevel=function(e){v.setLevel(e);for(var t in s)s.hasOwnProperty(t)&&s[t].setLevel(e)},a.getLevel=function(){return v.getLevel()},a.get=function(e){return s[e]||(s[e]=new d(c({name:e},v.context)))},a.createDefaultHandler=function(e){e=e||{},e.formatter=e.formatter||function(e,t){t.name&&e.unshift("["+t.name+"]")};var t={},n=function(e,t){Function.prototype.apply.call(e,console,t)};return"undefined"==typeof console?function(){}:function(r,i){r=Array.prototype.slice.call(r);var o,u=console.log;i.level===a.TIME?(o=(i.name?"["+i.name+"] ":"")+r[0],"start"===r[1]?console.time?console.time(o):t[o]=(new Date).getTime():console.timeEnd?console.timeEnd(o):n(u,[o+": "+((new Date).getTime()-t[o])+"ms"])):(i.level===a.WARN&&console.warn?u=console.warn:i.level===a.ERROR&&console.error?u=console.error:i.level===a.INFO&&console.info?u=console.info:i.level===a.DEBUG&&console.debug&&(u=console.debug),e.formatter(r,i),n(u,r))}},a.useDefaults=function(e){a.setLevel(e&&e.defaultLevel||a.DEBUG),a.setHandler(a.createDefaultHandler(e))},r=a,void 0!==(i="function"==typeof r?r.call(t,n,t,e):r)&&(e.exports=i)}()},,function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(3),u=r(a),s=n(1),l=r(s),c=function(){function e(){i(this,e)}return o(e,null,[{key:"getMultiRequest",value:function(e,t,n){var r=l.default.get(),i=r.serviceParams;Object.assign(i,{ks:t,clientTag:"html5:v"+e}),n&&Object.assign(i,{partnerId:n});var o=new Map;o.set("Content-Type","application/json");var a=new u.default(o);return a.method="POST",a.service="multirequest",a.url=a.getUrl(r.serviceUrl),a.params=i,a}}]),e}();t.default=c},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i=function(e){var t=[],n=/\[\]$/,i=function(e){return"[object Array]"===Object.prototype.toString.call(e)},o=function(e,n){n="function"==typeof n?n():null===n?"":void 0===n?"":n,t[t.length]=encodeURIComponent(e)+"="+encodeURIComponent(n)};return function e(a,u){var s=void 0,l=void 0,c=void 0;if(a)if(i(u))for(s=0,l=u.length;s<l;s++)n.test(a)?o(a,u[s]):e(a+":"+("object"===r(u[s])?s:""),u[s]);else if(u&&"[object Object]"===String(u))for(c in u)e(a+":"+c,u[c]);else o(a,u);else if(i(u))for(s=0,l=u.length;s<l;s++)o(u[s].name,u[s].value);else for(c in u)e(c,u[c]);return t}("",e).join("&").replace(/%20/g,"+")};t.param=i},,function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(8),l=r(s),c=n(0),f=r(c),d=n(1),v=r(d),p=n(9),y=function(e){function t(){return i(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),u(t,null,[{key:"trackEvent",value:function(e,t){var n=v.default.get(),r={};Object.assign(r,n.serviceParams,t);var i=new f.default;return i.service="analytics",i.action="trackEvent",i.method="GET",i.tag="analytics-trackEvent",i.params=r,i.url=e+"?service="+i.service+"&action="+i.action+"&"+(0,p.param)(i.params),i}}]),t}(l.default);t.default=y},,,,function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.VERSION=t.NAME=t.RequestBuilder=t.OVPConfiguration=t.OVPAnalyticsService=void 0;var i=n(0),o=r(i),a=n(1),u=r(a),s=n(11),l=r(s);t.OVPAnalyticsService=l.default,t.OVPConfiguration=u.default,t.RequestBuilder=o.default,t.NAME="playkit-js-providers-analytics-service",t.VERSION="2.3.2"}])})},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=function(){function e(){r(this,e),this._rates=[],this._isSwitchedToAbrMode=!1,this._rates=[],this._isSwitchedToAbrMode=!1}return i(e,[{key:"setRates",value:function(e){var t=this;this._rates=[],e.forEach(function(e){t._rates.push({rate:e,active:!1,duration:0})})}},{key:"setCurrent",value:function(e){if(0===e)this._isSwitchedToAbrMode=!0;else{this._rates.forEach(function(e){return e.active=!1});var t=this._rates.find(function(t){return t.rate===e});t&&(t.active=!0)}}},{key:"getCurrent",value:function(){if(this._isSwitchedToAbrMode)return this._isSwitchedToAbrMode=!1,0;var e=this._rates.find(function(e){return e.active});return e?e.rate:-1}},{key:"countCurrent",value:function(){var e=this._rates.find(function(e){return e.active});e&&e.duration++}},{key:"getAverage",value:function(){var e=0,t=0;return this._rates.forEach(function(n){t+=n.rate*n.duration,e+=n.duration}),e?t/e:0}},{key:"reset",value:function(){this._rates.forEach(function(e){return e.duration=0})}},{key:"destroy",value:function(){this._rates=[]}}]),e}();t.default=o},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(0),s=function(e){function t(e){r(this,t);var n=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return n._config=e,n}return o(t,e),a(t,[{key:"start",value:function(){var e=this;this._clearTimeout(),this._stopped=!1,this._resetCounter=0,this._eventCounter=0,this._intervalId=setInterval(function(){return e._monitor()},1e3)}},{key:"resume",value:function(){this._stopped=!1,this._resetCounter=0}},{key:"stop",value:function(){this._stopped=!0}},{key:"isStopped",value:function(){return this._stopped}},{key:"destroy",value:function(){this._clearTimeout()}},{key:"_clearTimeout",value:function(){this._intervalId&&(clearInterval(this._intervalId),this._intervalId=null)}},{key:"_monitor",value:function(){this._stopped?(this._resetCounter===this._config.resetCounter&&(this.dispatchEvent(new u.FakeEvent(t.Event.RESET)),this._resetCounter=0,this._eventCounter=0),this._resetCounter++):(this.dispatchEvent(new u.FakeEvent(t.Event.TICK)),this._eventCounter===this._config.eventCounter&&(this.dispatchEvent(new u.FakeEvent(t.Event.REPORT)),this._eventCounter=0),this._eventCounter++)}}]),t}(u.FakeEventTarget);s.Event={TICK:"tick",RESET:"reset",REPORT:"report"},t.default=s}])});
//# sourceMappingURL=playkit-kava.js.map