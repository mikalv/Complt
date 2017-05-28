module.exports = options => {
  const config = {
    presets: [['es2015', { modules: false }], 'stage-3', 'stage-0'],
    babelrc: false,
    plugins: [
      'syntax-dynamic-import',
      'transform-react-constant-elements',
      'transform-object-rest-spread',
      'lodash',
    ],
    cacheDirectory: !options.isProd,
  };
  if (options.jsx) {
    config.plugins.push(['transform-react-jsx', { pragma: options.jsx }]);
  }
  return config;
};
