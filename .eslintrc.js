module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  rules: {
    'react/jsx-filename-extension': 0,
    'import/no-extraneous-dependencies': 0,
    'no-underscore-dangle': 0,
    'import/no-named-as-default': 0,
    'no-use-before-define': 0,
    'new-cap': 0,
    'react/forbid-prop-types': 0,
    'react/require-default-props': 0, // <- This rule should be made to error later
  },
  env: {
    jest: true,
    browser: true,
    mocha: true,
  }
};
