import PouchDBAdapterHttp from 'pouchdb-adapter-http/lib/index.es';
import PouchDBReplication from 'pouchdb-replication/lib/index.es';
import PouchDB from './PouchDB';

PouchDB.plugin(PouchDBReplication).plugin(PouchDBAdapterHttp);

export default PouchDB;
