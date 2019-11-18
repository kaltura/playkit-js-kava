## KAVA Events List:

Here you can see the list of all available KAVA Events:

- [`VIEW`](#viewEvent)
- [`IMPRESSION`](#impressionEvent)
- [`PLAY_REQUEST`](#playRequestEvent)
- [`PLAY`](#playEvent)
- [`RESUME`](#resumeEvent)
- [`PAUSE`](#pauseEvent)
- [`REPLAY`](#replayEvent)
- [`SEEK`](#seekEvent)
- [`PLAY_REACHED_25_PERCENT`](#play25Event)
- [`PLAY_REACHED_50_PERCENT`](#play50Event)
- [`PLAY_REACHED_75_PERCENT`](#play75Event)
- [`PLAY_REACHED_100_PERCENT`](#play100Event)
- [`SOURCE_SELECTED`](#sourceSelectedEvent)
- [`FLAVOR_SWITCH`](#flavourSwitchEvent)
- [`AUDIO_SELECTED`](#audioSelectedEvent)
- [`CAPTIONS`](#captionsEvent)
- [`SPEED`](#speedEvent)
- [`ERROR`](#errorEvent)

## KAVA Events Documentation:

Here we will see some explanation about each event. When does it sent and what parameters it have.

<a id="viewEvent"></a>`VIEW` - Collective event that represent report for every 10 seconds of active playback.

- Event ID: `99`
- Event Parameters:
  - [`COMMON_PARAMS`](./kava-parameters.md#common_params)
  - [`playTimeSum`](./kava-parameters.md#playTimeSum)
  - [`bufferTime`](./kava-parameters.md#bufferTime)
  - [`bufferTimeSum`](./kava-parameters.md#bufferTimeSum)
  - [`actualBitrate`](./kava-parameters.md#actualBitrate)
  - [`averageBitrate`](./kava-parameters.md#averageBitrate)
  - [`segmentDownloadTime`](./kava-parameters.md#segmentDownloadTime)
  - [`bandwidth`](./kava-parameters.md#bandwidth)
  - [`tabMode`](./kava-parameters.md#tabMode)
  - [`soundMode`](./kava-parameters.md#soundMode)
  - [`manifestDownloadTime`](./kava-parameters.md#manifestDownloadTime)
  - [`forwardBufferHealth`](./kava-parameters.md#forwardBufferHealth)
  - [`targetBuffer`](./kava-parameters.md#targetBuffer)
  - [`droppedFramesRatio`](./kava-parameters.md#droppedFramesRatio)
  - [`networkConnectionType`](./kava-parameters.md#networkConnectionType)
  - [`networkConnectionOverhead`](./kava-parameters.md#networkConnectionOverhead)
  - [`flavorParamsId`](./kava-parameters.md#flavorParamsId)
- Sent every 10 second of active playback (when player is paused, view timer should be paused/stopped).
- 30 seconds without VIEW event will reset KAVA session, so all the VIEW [specific parameters](#endSessionResetParams) should be reset also.
- Server may notify Kava (via response field ["viewEventsEnabled" = false](#serverResponse)) to shut down VIEW events. When it happens, VIEW events should be blocked from sending until server decides to enable VIEW events again.

---

<a id="impressionEvent"></a>`IMPRESSION` - Sent when the player is loaded on the page with some entry ID. <BR>It will be triggered only once per entry.

- Event ID: `1`
- Player Event: `SOURCE_SELECTED`
- Event Parameters: 
  - [`COMMON_PARAMS`](./kava-parameters.md#common_params)
  - [`playerJSLoadTime`](./kava-parameters.md#playerJSLoadTime)

---

<a id="playRequestEvent"></a>`PLAY_REQUEST` - Sent when play was requested by application.

- Event ID: `2`
- Player Event: `PLAY`
- Event Parameters: - [`COMMON_PARAMS`](./kava-parameters.md#common_params)

---

<a id="playEvent"></a>`PLAY` - Sent when actual playback has been started for the first time.

- Event ID: `3`
- Player Event: `PLAYING`
- Event Parameters:
  - [`COMMON_PARAMS`](./kava-parameters.md#common_params)
  - [`bufferTime`](./kava-parameters.md#bufferTime)
  - [`bufferTimeSum`](./kava-parameters.md#bufferTimeSum)
  - [`actualBitrate`](./kava-parameters.md#actualBitrate)
  - [`joinTime`](./kava-parameters.md#joinTime)

---

<a id="resumeEvent"></a>`RESUME` - Sent when actual playback has been resumed (!NOT for the first time).

- Event ID: `4`
- Player Event: `PLAYING`
- Event Parameters:
  - [`COMMON_PARAMS`](./kava-parameters.md#common_params)
  - [`bufferTime`](./kava-parameters.md#bufferTime)
  - [`bufferTimeSum`](./kava-parameters.md#bufferTimeSum)
  - [`actualBitrate`](./kava-parameters.md#actualBitrate)

---

<a id="pauseEvent"></a>`PAUSE` - Sent when playback was paused (Player PAUSE event received).

- Event ID: `33`
- Player Event: `PAUSE`
- Event Parameters: - [`COMMON_PARAMS`](./kava-parameters.md#common_params)
- During pause Kava should prevent from counting VIEW event timer.

---

<a id="replayEvent"></a>`REPLAY` - Sent when replay called by application (Player REPLAY event received).

- Event ID: `34`
- Player Event: `PLAYING`
- Event Parameters:
  - [`COMMON_PARAMS`](./kava-parameters.md#common_params)
- Replay should reset all the parameters related to playback except `PLAYER_REACHED` events.

---

<a id="seekEvent"></a>`SEEK` - Sent when seek requested.

- Event ID: `35`
- Player Event: `SEEKING`
- Event Parameters:
  - [`COMMON_PARAMS`](./kava-parameters.md#common_params)
  - [`targetPosition`](./kava-parameters.md#targetPosition)

---

<a id="play25Event"></a>`PLAY_REACHED_25_PERCENT` - Sent when player reached 25% of the playback. No matter if by seeking or regular playback.

- Event ID: `11`
- Event Parameters:
  - [`COMMON_PARAMS`](./kava-parameters.md#common_params)
- Sent only once per entry.

---

<a id="play50Event"></a>`PLAY_REACHED_50_PERCENT` - Sent when player reached 50% of the playback. No matter if by seeking or regular playback.

- Event ID: `12`
- Event Parameters:
  - [`COMMON_PARAMS`](./kava-parameters.md#common_params)
- Sent only once per entry.
- If reached before 25% (by seeking or startTime) first will fire:
  - `PLAY_REACHED_25_PERCENT` event.

---

<a id="play75Event"></a>`PLAY_REACHED_75_PERCENT` - Sent when player reached 75% of the playback. No matter if by seeking or regular playback.

- Event ID: `13`
- Event Parameters:
  - [`COMMON_PARAMS`](./kava-parameters.md#common_params)
- Sent only once per entry.
- If reached before 50% (by seeking or startTime) first will fire: - `PLAY_REACHED_25_PERCENT` event. - `PLAY_REACHED_50_PERCENT` event.

---

<a id="play100Event"></a>`PLAY_REACHED_100_PERCENT` - Sent when player reached 100% of the playback(Player END event).
No matter if by seeking or regular playback.

- Event ID: `14`
- Event Parameters:
  - [`COMMON_PARAMS`](./kava-parameters.md#common_params)
- Sent only once per entry.
- If reached before 75% (by seeking or startFrom) first will fire: - `PLAY_REACHED_25_PERCENT` event. - `PLAY_REACHED_50_PERCENT` event. - `PLAY_REACHED_75_PERCENT` event.

---

<a id="sourceSelectedEvent"></a>`SOURCE_SELECTED` - Sent when video track changed manually (Not ABR selection).

- Event ID: `39`
- Player Event: `VIDEO_TRACK_CHANGED` - `player.isAdaptiveBitrateEnabled()` should be false.
- Event Parameters:
  - [`COMMON_PARAMS`](./kava-parameters.md#common_params)
  - [`actualBitrate`](./kava-parameters.md#actualBitrate)

---

<a id="flavourSwitchEvent"></a>`FLAVOR_SWITCH` - Sent when video track changed by ABR mode.

- Event ID: `43`
- Player Event: `VIDEO_TRACK_CHANGED` - `player.isAdaptiveBitrateEnabled()` should be true.
- Event Parameters:
  - [`COMMON_PARAMS`](./kava-parameters.md#common_params)
  - [`actualBitrate`](./kava-parameters.md#actualBitrate)

---

<a id="audioSelectedEvent"></a>`AUDIO_SELECTED` - Sent when audio track changed.

- Event ID: `42`
- Player Event: `AUDIO_TRACK_CHANGED`
- Event Parameters:
  - [`COMMON_PARAMS`](./kava-parameters.md#common_params)
  - [`language`](./kava-parameters.md#language)

---

<a id="captionsEvent"></a>`CAPTIONS` - Sent when text track changed.

- Event ID: `38`
- Player Event: `TEXT_TRACK_CHANGED`
- Event Parameters:
  - [`COMMON_PARAMS`](./kava-parameters.md#common_params)
  - [`caption`](./kava-parameters.md#caption)

---

<a id="speedEvent"></a>`SPEED` - Sent when playback rate has changed.

- Event ID: `41`
- Player Event: `RATE_CHANGE`
- Event Parameters:
  - [`COMMON_PARAMS`](./kava-parameters.md#common_params)
  - [`playbackSpeed`](./kava-parameters.md#playbackSpeed)

---

<a id="errorEvent"></a>`ERROR` - Sent when error occurs. (Player ERROR event received).

- Event ID: `98`
- Player Event: `ERROR`
- Event Parameters:
  - [`COMMON_PARAMS`](./kava-parameters.md#common_params)
  - [`errorCode`](./kava-parameters.md#errorCode)
