import PouchDB from 'pouchdb-core';
import PouchDBAdapterIdb from 'pouchdb-adapter-idb';

PouchDB.plugin(PouchDBAdapterIdb);

export default PouchDB;
