import PouchDB from 'pouchdb-core/lib/index.es';
import PouchDBAdapterIdb from 'pouchdb-adapter-idb/lib/index.es';
import PouchDBAdapterWebSql from 'pouchdb-adapter-websql/lib/index.es';

PouchDB.plugin(PouchDBAdapterIdb).plugin(PouchDBAdapterWebSql);

export default PouchDB;
