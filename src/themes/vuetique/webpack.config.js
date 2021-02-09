// You can extend default webpack build here. Read more on docs: https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Working%20with%20webpack.md
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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