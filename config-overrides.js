const webpack = require('webpack');

module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    "crypto": require.resolve("crypto-browserify"),
    "stream": require.resolve("stream-browserify"),
    "assert": require.resolve("assert"),
    "http": require.resolve("stream-http"),
    "https": require.resolve("https-browserify"),
    "os": require.resolve("os-browserify"),
    "url": require.resolve("url"),
    "path": require.resolve("path-browserify"),
    "buffer": require.resolve("buffer/"),
    "process": require.resolve("process/browser")
  });
  config.resolve.fallback = fallback;
  
  // Inject polyfills FIRST
  config.entry = [
    require.resolve('./src/polyfills.js'),
    ...(Array.isArray(config.entry) ? config.entry : [config.entry])
  ];
  
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  ]);
  
  config.ignoreWarnings = [/Failed to parse source map/];
  
  return config;
}