module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier', 'prettier/react'],
  plugins: ['prettier'],
  rules: {
    'react/jsx-filename-extension': 0,
    'import/no-extraneous-dependencies': 0,
    'no-underscore-dangle': 0,
    'import/no-named-as-default': 0,
    'no-use-before-define': 0,
    'new-cap': 0,
    'react/prop-types': 0,
    'react/require-default-props': 0,
    'prettier/prettier': ['error', {'trailingComma': 'es5', 'singleQuote': true}],
    'class-methods-use-this': 0,
  },
  env: {
    jest: true,
    browser: true,
    mocha: true,
  }
};
