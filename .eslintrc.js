module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  rules: {
    'react/jsx-filename-extension': 0,
    'import/no-extraneous-dependencies': 0,
    'no-underscore-dangle': 0,
    'import/no-named-as-default': 0,
    'import/no-unresolved': 2,
    'react/forbid-prop-types': 0,
    'global-require': 0,
  },
  env: {
    jest: true,
    browser: true,
  },
};
