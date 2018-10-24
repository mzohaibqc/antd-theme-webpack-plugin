module.exports = function(config, env) {
  if (env === 'production') {
    config.entry = {
      index: ['babel-polyfill', './src/index.js'],
      common: ['react', 'react-dom']
    };

  }
  return config;
};
