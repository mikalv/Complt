import PouchDB from 'pouchdb-core';
import PouchDBAdapterIdb from 'pouchdb-adapter-idb';
import PouchDBAdapterWebSql from 'pouchdb-adapter-websql';

PouchDB.plugin(PouchDBAdapterIdb).plugin(PouchDBAdapterWebSql);

export default PouchDB;
