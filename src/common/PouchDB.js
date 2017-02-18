import PouchDB from 'pouchdb-core/lib/index-browser.es';
import PouchDBAdapterIdb from 'pouchdb-adapter-idb/lib/index.es';
import PouchDBAdapterWebSql from 'pouchdb-adapter-websql/lib/index.es';
import PouchDBAdapterHttp from 'pouchdb-adapter-http/lib/index.es';
import PouchDBReplication from 'pouchdb-replication/lib/index.es';

PouchDB
.plugin(PouchDBAdapterIdb)
.plugin(PouchDBAdapterWebSql)
.plugin(PouchDBAdapterHttp)
.plugin(PouchDBReplication);

export default PouchDB;
