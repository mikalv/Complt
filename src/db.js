import PouchDB from 'pouchdb/lib/index-browser';

window.PouchDB = PouchDB;

export default new PouchDB('items');
