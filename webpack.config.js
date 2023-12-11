'use strict';

const webpack = require('webpack');
const path = require('path');
const packageData = require('./package.json');

const plugins = [
  new webpack.DefinePlugin({
    __VERSION__: JSON.stringify(packageData.version),
    __NAME__: JSON.stringify(packageData.name)
  })
];

module.exports = {
  context: __dirname + '/src',
  entry: {
    'playkit-kava': 'index.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
    library: ['KalturaPlayer', 'plugins', 'kava'],
    devtoolModuleFilenameTemplate: './kava/[resource-path]'
  },
  devtool: 'source-map',
  plugins: plugins,
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        exclude: [/node_modules/]
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        enforce: 'pre',
        use: [
          {
            loader: 'eslint-loader',
            options: {
              rules: {
                semi: 0
              }
            }
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: __dirname + '/src'
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    alias: {
      '@playkit-js/related': path.resolve(`node_modules/@playkit-js/related/types`),
      '@playkit-js/share': path.resolve(`node_modules/@playkit-js/share/types`),
      '@playkit-js/playkit-js-downloads': path.resolve(`node_modules/@playkit-js/playkit-js-downloads/types`),
      '@playkit-js/info': path.resolve(`node_modules/@playkit-js/info/types`),
      '@playkit-js/moderation': path.resolve(`node_modules/@playkit-js/moderation/types`)
    },
    extensions: ['.js']
  },
  externals: {
    '@playkit-js/kaltura-player-js': ['KalturaPlayer'],
    '@playkit-js/playkit-js-providers': ['KalturaPlayer', 'providers']
  }
};
