import path from 'path';
import merge from 'webpack-merge';
import baseClientConfig from './webpack.client.config';
const themeRoot = require('./theme-path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const extendedConfig = require(path.join(themeRoot, '/webpack.config.js'))

const prodClientConfig = merge(baseClientConfig, {
  mode: 'production',
  devtool: 'nosources-source-map',
  plugins: [
  ]
})
module.exports = function(config, { isClient, isDev }) {
  let configLoaders;
  if (isClient) {
    configLoaders = config.module.rules;
    config.plugins.push(
      new BundleAnalyzerPlugin({
        openAnalyzer: false,
        statsFilename: 'test',
        generateStatsFile: true,
        analyzerMode: 'static',
      }),
    );
  } else {
    configLoaders = config.module.rules;
  }
  configLoaders.push({
    test: /\.json5$/,
    loader: 'json5-loader',
  });
  return config;
};