const webpack = require('webpack');
const path = require('path');
const packageData = require('./package.json');

module.exports = (env, { mode }) => {
  return {
    target: 'web',
    entry: './src/index.ts',
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.(ts|js)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    bugfixes: true
                  }
                ],
                '@babel/preset-typescript'
              ],
              plugins: [['@babel/plugin-transform-runtime']]
            }
          }
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.js'],
      alias: {
        '@playkit-js/related': path.resolve(`node_modules/@playkit-js/related/types`),
        '@playkit-js/share': path.resolve(`node_modules/@playkit-js/share/types`),
        '@playkit-js/playkit-js-downloads': path.resolve(`node_modules/@playkit-js/playkit-js-downloads/types`),
        '@playkit-js/info': path.resolve(`node_modules/@playkit-js/info/types`),
        '@playkit-js/moderation': path.resolve(`node_modules/@playkit-js/moderation/types`)
      }
    },
    output: {
      filename: 'playkit-kava.js',
      path: path.resolve(__dirname, 'dist'),
      library: {
        umdNamedDefine: true,
        name: ['KalturaPlayer', 'plugins', 'kava'],
        type: 'umd'
      },
      clean: true
    },
    externals: {
      '@playkit-js/kaltura-player-js': 'root KalturaPlayer',
      '@playkit-js/playkit-js-providers': 'root KalturaPlayer.providers'
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist')
      },
      client: {
        progress: true
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        __VERSION__: JSON.stringify(packageData.version),
        __NAME__: JSON.stringify(packageData.name)
      })
    ]
  };
};
