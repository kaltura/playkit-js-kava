# PlayKit JS Kava - Kaltura Advanced Video Analytics Plugin for the [PlayKit JS Player]

[![Build Status](https://travis-ci.org/kaltura/playkit-js-kava.svg?branch=master)](https://travis-ci.org/kaltura/playkit-js-kava)

PlayKit JS Kava plugin integrates Kava (Kaltura Advanced Video Analytics) with the [PlayKit JS Player]. 

The main purpose of this plugin is to track and collect various events and data about the video player.
 
PlayKit JS Kava is written in [ECMAScript6], statically analysed using [Flow] and transpiled in ECMAScript5 using [Babel].

[Flow]: https://flow.org/
[ECMAScript6]: https://github.com/ericdouglas/ES6-Learning#articles--tutorials
[Babel]: https://babeljs.io

## Getting Started

### Prerequisites
The plugin requires [PlayKit JS Player] to be loaded first.

[Playkit JS Player]: https://github.com/kaltura/playkit-js

### Installing

First, clone and run [yarn] to install dependencies:

[yarn]: https://yarnpkg.com/lang/en/

```
git clone https://github.com/kaltura/playkit-js-kava.git
cd playkit-js-kava
yarn install
```

### Building

Then, build the player

```javascript
yarn run build
```

### Embed the Library In Your Test Page

Finally, add the bundle as a script tag in your page, and initialize the player

```html
<script type="text/javascript" src="/PATH/TO/FILE/playkit.js"></script>
<script type="text/javascript" src="/PATH/TO/FILE/playkit-kava.js"></script>
<div id="player-placeholder" style="height:360px; width:640px">
<script type="text/javascript">
var playerContainer = document.querySelector("#player-placeholder");
var config = {
 ...
 plugins: {
   kava: { 
     ...
   }
 }
 ...
};
var player = playkit.core.loadPlayer(config);
playerContainer.appendChild(player.getView());
player.play();
</script>
```

## Documentation

### Table of Contents
- [KAVA Configuration](./docs/configuration.md)
- [KAVA Events](./docs/kava-events.md)
- [KAVA Parameters](./docs/kava-parameters.md)

## Running the Tests

Tests can be run locally via [Karma], which will run on Chrome, Firefox and Safari.

[Karma]: https://karma-runner.github.io/1.0/index.html
```
yarn run test
```

You can test individual browsers:
```
yarn run test:chrome
yarn run test:firefox
yarn run test:safari
```

### And Coding Style Tests

We use ESLint [recommended set](http://eslint.org/docs/rules/) with some additions for enforcing [Flow] types and other rules.

See [ESLint config](.eslintrc.json) for full configuration.

We also use [.editorconfig](.editorconfig) to maintain consistent coding styles and settings, please make sure you comply with the styling.


## Compatibility

TBD

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/kaltura/playkit-js-kanalytics/tags). 

## License

This project is licensed under the AGPL-3.0 License - see the [LICENSE.md](LICENSE.md) file for details
