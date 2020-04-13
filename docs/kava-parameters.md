## Table of Contents

- [KAVA Parameters](#kava-parameters)
- [Common Parameters](#common-parameters)
- [End Session Reset Parameters](#end-session-reset-parameters)
- [Server Response Structure](#server-response--structure)

## KAVA Parameters

Kava parameters are additional data that is sent with Kava event and represent relevant information about current playback, media information etc

<a id="eventType"></a>`eventType` - ID of the Kava event.

- Obtained from [`kava-event-model.js`](../src/kava-event-model.js) enums.
- **Mandatory field**. If not exist, sending of all events should be blocked and related warning should be printed to log.

---

<a id="partnerId"></a>`partnerId` - The partner account ID on Kaltura's platform.

- Obtained from the plugin config (injected automatically by the player, no need to configure it explicitly).
- **Mandatory field**. If not exist, sending of all events should be blocked and related warning should be printed to log.

---

<a id="entryId"></a>`entryId` - The delivered content ID on Kaltura's platform.

- Obtained from the plugin config (injected automatically by the player, no need to configure it explicitly).
- **Mandatory field**. If not exist, sending of all events should be blocked and related warning should be printed to log.

---

<a id="ks"></a>`ks` - The Kaltura encoded session data.

- Obtained from the plugin config (injected automatically by the player, no need to configure it explicitly).
- If not exist do not send this parameter at all.

---

<a id="sessionId"></a>`sessionId` - A unique string which identifies a unique viewing session, a page refresh should use different identifier.

- Obtained from the plugin config (injected automatically by the player, no need to configure it explicitly).

---

<a id="eventIndex"></a>`eventIndex` - A sequence number which describe the order of events in a viewing session. In general it is just a counter of sent events.

- Starts from 1.
- Each event that is send must have unique id and increment after each event sent.
- When Kava session expired/reset should be reset to the initial value (1). For example:

  - New media entry will reset this counter.
  - `VIEW` event that was not sent for 30 seconds also reset this value.

---

<a id="bufferTime"></a>`bufferTime` - The amount time spent on buffering from the last VIEW event.

- Should be 0 to 10 in `VIEW` events.
- Can be 0 to ∞ for `PLAY/RESUME` events.
- Should be in format of float (second.milliSecond).
- Reset to 0 after every `VIEW` event.
- New media entry will reset this value.
- `VIEW` event that was not sent for 30 seconds also reset this value.

---

<a id="bufferTimeSum"></a>`bufferTimeSum` - Sum of all the buffer time during all the playback.

- Can be 0 to ∞.
  - Should be in format of float (second.milliSecond).
  - New media entry will reset this value.
  - `VIEW` event that was not sent for 30 seconds also reset this value.

---

<a id="actualBitrate"></a>`actualBitrate` - The bitrate of the displayed video track in kbps.

- When ABR mode selected manually - value should be 0.
  - In `SOURCE_SELECTED` event should be equal to the manually selected video bitrate.
  - In `FLAVOUR_SWITCH` event should be based on ABR selection and equal to the currently selected bitrate by ABR.

---

<a id="referrer"></a>`referrer` - Application referrer id.

- Obtained from `document.referrer || document.URL`.
  - Valid referrer should start from one of the following prefixes:
    - "http://"
    - "https://"
  - Should be converted to Base64 (before sending to the server).

---

<a id="deliveryType"></a>`deliveryType` - The player's streamer type.

- Obtained from `player.streamType`.
  - Should be re-obtained for every new media entry.
  - Should be one of the following: `hls`, `dash` or `url` (for progressive playback).

---

<a id="playbackType"></a>`playbackType` - The type of the current playback.

- Obtained from `player.config.type`.
- Must be on of the following:
  - `vod` - For regular media.
  - `live` - For live stream.
  - `dvr` - When playback type is `live` and offset from the live edge is grater then threshold that specified in plugin config object (default is 2 minutes, but can be customised).

---

<a id="sessionStartTime"></a>`sessionStartTime` - The timestamp of the first event in the session.

- Obtained from response of the first event.
  - [`response.time`](#serverResponse) field on Json object that comes with the response.
  - First event that fired will not have this value.
  - Should be reset on change media.
  - Should be reset when player is paused.
  - Should be in Unix time format.

---

<a id="uiConfId"></a>`uiConfId` - The player ui configuration id.

- Obtained from the plugin config (injected automatically by the player, no need to configure it explicitly).
- If not exist do not send this parameter at all.

---

<a id="clientVer"></a>`clientVer` - The player version.

- Obtained from the plugin config (injected automatically by the player, no need to configure it explicitly).

---

<a id="clientTag"></a>`clientTag` - The client tag.

- Equals to `"html5:v"` + `clientVer`.

---

<a id="position"></a>`position` - The playback position of the media.

- Should be in format of float (second.milliSecond).
  - When [`playbackType`](#playbackType) is `live`, this value should represent the offset of the playback position from the live edge.
    - 0 when media position is on the live edge
    - -2.5 when offset from the live edge is 2.5 seconds, for example.
  - When [`playbackType`](#playbackType) is `vod`, should be a positive value.

---

<a id="customVar1"></a>`customVar1`, <a id="customVar2"></a>`customVar2`, <a id="customVar3"></a>`customVar3` - Optional parameter defined by the user.

- Can be any primitive value or String.
  - Optional parameter.
  - Obtained from the plugin config.
  - If not exist do not send this parameter at all.

---

<a id="targetPosition"></a>`targetPosition` - The requested seek position of the media.

- Should be in format of float (second.milliSecond).
- Obtained from the player `SEEKING` event.

---

<a id="errorCode"></a>`errorCode` - The code of the occurred error.

- Should be in format of integer.
- Obtained from the player `ERROR` event.

---

<a id="errorDetails"></a>`errorDetails` - Additional data of the error.

- Should be in format of String (Stringified from JSON)

---

<a id="errorPosition"></a>`errorPosition` - The position of the stream when the error occurred (pre play request / pre playing / mid stream).
This is in addition to the `position` field which in live streams represents the offset from the live edge and therefore cannot
be used to differ between pre play request, pre-playing and mid streaming.

- Should be in format of integer.
- Possible values
  - 3 - pre play request stream error (Play was not requested from video element)
  - 1 - pre-playing stream error (First frame was not rendered)
  - 2 - mid stream error (First frame was already rendered)

---

<a id="joinTime"></a>`joinTime` - Time that took to player start active playback for the first time.

- Obtained by calculating time that passed from first PLAY_REQUEST to PLAY event.

---

<a id="playTimeSum"></a>`playTimeSum` - Sum of time played for the current Kava session.

- Should be in format of float (second.milliSecond).
  - Can be 0 to ∞.
  - Only active playback should be counted.
  - When Kava session expired/reset should be reset to the initial value = 0.

---

<a id="segmentDownloadTime"></a>`segmentDownloadTime` - Longest segment download time in seconds.

- Should be in format of float (second.milliSecond).
- The value is calculated from the last VIEW event.

---

<a id="bandwidth"></a>`bandwidth` - Average bandwidth in kbps.

- kbps in format of float.
- The value is calculated from the last VIEW event.

---

<a id="tabMode"></a>`tabMode` - Is tab focused or not.

- Possible values
  - 1 - Tab not focused
  - 2 - Tab focused
- The value represents the state when the VIEW event is sent.

---

<a id="soundMode"></a>`soundMode` - Is sound muted or not.

- Possible values
  - 1 - Sound off
  - 2 - Sound on
- Sound is considered off if muted or volume is set to 0
- The value represents the state when the VIEW event is sent.

---

<a id="manifestDownloadTime"></a>`manifestDownloadTime` - Longest manifest download time in seconds.

- Should be in format of float (second.milliSecond).
- The value is calculated from the last VIEW event.

---

<a id="forwardBufferHealth"></a>`forwardBufferHealth` - Ratio between available buffer and target buffer.

- Should be in format of float.
- The value represents the state when the VIEW event is sent.

---

<a id="targetBuffer"></a>`targetBuffer` - The target buffer of the player.

- Should be in format of float (second.milliSecond).
- The value represents the state when the VIEW event is sent.

---

<a id="droppedFramesRatio"></a>`droppedFramesRatio` - Ratio between dropped frames and rendered frames.

- Should be in format of float (between 0 to 1).
- The value is calculated from the last VIEW event.

---

<a id="networkConnectionType"></a>`networkConnectionType` - The effective type of the connection.

- A String containing one of 'slow-2g', '2g', '3g', or '4g'.

---

<a id="networkConnectionOverhead"></a>`networkConnectionOverhead` - Max dns+ssl+tcp resolving time of the video segments.

- Should be in format of float (second.milliSecond).
- The value is calculated from the last VIEW event.

---

<a id="playerJSLoadTime"></a>`playerJSLoadTime` - the player library load time.

- Should be in format of float (second.milliSecond).

---

<a id="flavorParamsId"></a>`flavorParamsId` - The flavor params Id of the currently playing rendition, only valid for Kaltura live streams.

- Should be in format of integer.

---

<a id="averageBitrate"></a>`averageBitrate` - Average of all [`actualBitrate`](#actualBitrate) for the current Kava session.

- When Kava session expired/reset should be reset to the initial value = 0.

---

<a id="language"></a>`language` - Selected audio language.

---

<a id="caption"></a>`caption` - Selected caption language.

---

<a id="playbackSpeed"></a>`playbackSpeed` - the playback speed rate.

---

## <a id="common_params"></a>Common Parameters

The common parameters are parameters which are sent in any Kava event.
The common parameters defined the following:

- [`eventType`](#eventType)
- [`partnerId`](#partnerId)
- [`entryId`](#entryId)
- [`sessionId`](#sessionId)
- [`eventIndex`](#eventIndex)
- [`ks`](#ks)
- [`referrer`](#referrer)
- [`deliveryType`](#deliveryType)
- [`playbackType`](#playbackType)
- [`sessionStartTime`](#sessionStartTime)
- [`uiConfId`](#uiConfId)
- [`clientVer`](#clientVer)
- [`clientTag`](#clientTag)
- [`position`](#position)
- [`playbackSpeed`](#playbackSpeed)
- [`caption`](#caption) - optional, available only if video contains text tracks
- [`customVar1`](#customVar1)
- [`customVar2`](#customVar2)
- [`customVar3`](#customVar3)

## <a id="endSessionResetParams"></a>End Session Reset Parameters

The following are parameters to reset when KAVA session has expired:

- [`eventIndex`](#eventIndex) - Reset value = 1
- [`playTimeSum`](#playTimeSum) - Reset value = 0
- [`averageBitrate`](#averageBitrate) - Reset value = 0
- [`bufferTimeSum`](#bufferTimeSum) - Reset value = 0

## <a id="serverResponse"></a>Server Response Structure

Following is the structure of server response:

```json
{
  "time": 12345,
  "viewEventsEnabled": true
}
```
