# PlayKit JS Kava - Kaltura Advanced Video Analytics Plugin for the [Kaltura Player JS]

[![Build Status](https://travis-ci.org/kaltura/playkit-js-kava.svg?branch=master)](https://travis-ci.org/kaltura/playkit-js-kava)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![](https://img.shields.io/npm/v/@playkit-js/playkit-js-kava/latest.svg)](https://www.npmjs.com/package/@playkit-js/playkit-js-kava)
[![](https://img.shields.io/npm/v/@playkit-js/playkit-js-kava/canary.svg)](https://www.npmjs.com/package/@playkit-js/playkit-js-kava/v/canary)

PlayKit JS Kava plugin integrates Kava (Kaltura Advanced Video Analytics) with the [Kaltura Player JS].

The main purpose of this plugin is to track and collect various events and data about the video player.

PlayKit JS Kava is written in [ECMAScript6], statically analysed using [Flow] and transpiled in ECMAScript5 using [Babel].

[flow]: https://flow.org/
[ecmascript6]: https://github.com/ericdouglas/ES6-Learning#articles--tutorials
[babel]: https://babeljs.io

## Getting Started

### Prerequisites

The plugin requires [PlayKit JS Player] to be loaded first.

[kaltura player js]: https://github.com/kaltura/kaltura-player-js

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
<script type="text/javascript" src="/PATH/TO/FILE/kaltura-{ovp/tv}-player.js"></script>
<script type="text/javascript" src="/PATH/TO/FILE/playkit-kava.js"></script>
<div id="player-placeholder" style="height:360px; width:640px">
<script type="text/javascript">
var config = {
  targetId: 'player-placeholder',
  provider: {
    partnerId: {PARTNER_ID}
    ...
  },
  plugins: {
    kava: {
       ...
    }
   ...
  }
...
};
var player = KalturaPlayer.setup(config);
player.loadMedia({
  entryId: '{ENTRY_ID}'
  ...
});
</script>
```

## Documentation

### Table of Contents

- [Configuration & API](docs/configuration-api.md)
- [Events](./docs/kava-events.md)
- [Parameters](./docs/kava-parameters.md)

## Running the Tests

Tests can be run locally via [Karma], which will run on Chrome, Firefox and Safari.

[karma]: https://karma-runner.github.io/1.0/index.html

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
