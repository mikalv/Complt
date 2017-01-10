import PouchDB from 'pouchdb';
import PouchDBAdapterMemory from 'pouchdb-adapter-memory';

PouchDB.plugin(PouchDBAdapterMemory);

export default new PouchDB('items', { adapter: 'memory' });
