if (typeof Promise === 'undefined') {
  window.Promise = require('pouchdb-promise');
}

// fetch() polyfill for making API calls.
if (process.env.NODE_ENV !== 'test') require('unfetch/polyfill');

// Object.assign() is commonly used with React.
// It will use the native implementation if it's present and isn't buggy.
Object.assign = require('object-assign');
