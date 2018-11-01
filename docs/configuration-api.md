# Configuration & API

### Table of Contents

- [KavaConfigObject](#kavaconfigobject)
  - [tamperAnalyticsHandler](#tamperanalyticshandler)
- [Kava](#kava)
  - [destroy](#destroy)
  - [reset](#reset)
  - [sendAnalytics](#sendanalytics)
  - [defaultConfig](#defaultconfig)
  - [isValid](#isvalid)

## KavaConfigObject

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

**Properties**

- `serviceUrl` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** The Kaltura API server.
- `viewEventCountdown` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)?** The interval in seconds that VIEW event will be sent.
- `resetSessionCountdown` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)?** The interval in seconds that Kava session will be reset.
- `dvrThreshold` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)?** Threshold in seconds from the live edge.
- `applicationVersion` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** Used to send the application version from which the user is playing the entry.
- `playbackContext` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** Used to send the id of the category from which the user is playing the entry.
- `tamperAnalyticsHandler` **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)?** An optional handler to implement. Can be used to manipulate the model data before analytics event sent, or to cancel a certain analytics request.
- `customVar1` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Custom objects field.
- `customVar2` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Custom objects field.
- `customVar3` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Custom objects field.

**Examples**

```javascript
// Default config
{
  serviceUrl: '//analytics.kaltura.com/api_v3/index.php',
  viewEventCountdown: 30,
  resetSessionCountdown: 30,
  dvrThreshold: 120,
  applicationVersion: '',
  playbackContext: ''
}
```

### tamperAnalyticsHandler

**Parameters**

- `model` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Event model

**Examples**

```javascript
tamperAnalyticsHandler: function (model) {
     // Always add myCustomFlag but don't send the request if the event type equals to 2
     model.myCustomFlag = true;
     if (model.eventType !== 2) {
       return true;
     }
     return false;
   }
```

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Should send the request or not.

## Kava

**Extends BasePlugin**

**Parameters**

- `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The plugin name.
- `player` **Player** The player instance.
- `config` **[KavaConfigObject](#kavaconfigobject)** The plugin config.

### destroy

Destroys the plugin.

Returns **void**

### reset

Reset the plugin.

Returns **void**

### sendAnalytics

Sends KAVA analytics event to analytics service.

**Parameters**

- `model` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Event model.

Returns **void**

### defaultConfig

Default config of the plugin.

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

### isValid

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Whether the plugin is valid in the current environment.
