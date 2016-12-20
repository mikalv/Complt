module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  plugins: ['graphql'],
  rules: {
    'react/jsx-filename-extension': 0,
    'import/no-extraneous-dependencies': 0,
    'no-underscore-dangle': 0,
    'import/no-named-as-default': 0,
    'graphql/template-strings': ['error', {
      env: 'literal',
    schemaJson: require('./api/schema.json'),
  }],
  },
  env: {
    jest: true,
    browser: true,
  }
};
