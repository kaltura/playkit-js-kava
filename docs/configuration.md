# Configuration

### Structure

```js
{
  serviceUrl: string,
  viewEventCountdown: number,
  resetSessionCountdown: number,
  dvrThreshold: number,
  customVar1: Object,
  customVar2: Object,
  customVar3: Object,
  applicationVersion: string,
  playabckContext: string
}
```

### Default Values

```js
{
  serviceUrl: '//analytics.kaltura.com/api_v3/index.php',
  viewEventCountdown: 10,
  resetSessionCountdown: 30,
  dvrThreshold: 120
}
```

##

> ### config.serviceUrl
>
> ##### Type: `string`
>
> ##### Default: `'//analytics.kaltura.com/api_v3/index.php'`
>
> ##### Description: The Kaltura API server.

##

> ### config.viewEventCountdown
>
> ##### Type: `number`
>
> ##### Default: `10`
>
> ##### Description: The interval in seconds that VIEW event will be sent.

##

> ### config.resetSessionCountdown
>
> ##### Type: `number`
>
> ##### Default: `30`
>
> ##### Description: The interval in seconds that Kava session will be reset.

##

> ### config.dvrThreshold
>
> ##### Type: `number`
>
> ##### Default: `120`
>
> ##### Description: Threshold in seconds from the live edge.
>
> When player's playback position from the live edge <= then dvrThreshold, Kava will set playbackType to dvr. Otherwise it will be live.

##

> ### config.customVar1/customVar2/customVar3
>
> ##### Type: `any`
>
> ##### Default: `-`
>
> ##### Description: Custom objects fields.
>
> You can use these fields for your own custom needs.

##

> ### config.applicationVersion
>
> ##### Type: `string`
>
> ##### Default: `-`
>
> ##### Description: Used to send the application version from which the user is playing the entry.

##

> ### config.playbackContext
>
> ##### Type: `string`
>
> ##### Default: `-`
>
> ##### Description: Used to send the id of the category from which the user is playing the entry.
