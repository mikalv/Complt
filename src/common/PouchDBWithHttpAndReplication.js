import PouchDBAdapterHttp from 'pouchdb-adapter-http';
import PouchDBReplication from 'pouchdb-replication';
import PouchDB from './PouchDB';

PouchDB.plugin(PouchDBReplication).plugin(PouchDBAdapterHttp);

export default PouchDB;
