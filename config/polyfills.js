import PouchDBPromise from 'pouchdb-promise';
import unfetch from 'unfetch';
import ObjectAssign from 'object-assign';

if (typeof Promise === 'undefined') {
  window.Promise = PouchDBPromise;
}

// fetch() polyfill for making API calls.
if (process.env.NODE_ENV !== 'test') window.fetch = unfetch;

// Object.assign() is commonly used with React.
// It will use the native implementation if it's present and isn't buggy.
Object.assign = ObjectAssign;
