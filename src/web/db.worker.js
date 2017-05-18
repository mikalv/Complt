import PouchDB from 'pouchdb-core';
import PouchDBAdapterIdb from 'pouchdb-adapter-idb';
import PouchDBAdapterWebSql from 'pouchdb-adapter-websql';
import PouchDBAdapterHttp from 'pouchdb-adapter-http';
import PouchDBReplication from 'pouchdb-replication';
import registerPromiseWorker from 'promise-worker/register';

PouchDB.plugin(PouchDBAdapterIdb)
  .plugin(PouchDBAdapterWebSql)
  .plugin(PouchDBReplication)
  .plugin(PouchDBAdapterHttp);

function parseJsonSafely(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return false;
  }
}

const db = new PouchDB('items');

const pouchDBSync = (token, remoteURI) =>
  new Promise((resolve, reject) => {
    const remoteDB = new PouchDB(remoteURI, {
      ajax: { headers: { Authorization: `Bearer ${token}` } },
      skip_setup: true,
    });
    PouchDB.sync(db, remoteDB).on('error', reject).on('complete', resolve);
  });

registerPromiseWorker(message => {
  if (!message) return;
  if (message.type === 'SYNC') {
    return pouchDBSync(...message.args); // eslint-disable-line consistent-return
  }
  return db[message.name](...message.args); // eslint-disable-line consistent-return
});
self.addEventListener('message', ({ data }) => {
  const parsedData = parseJsonSafely(data);
  if (Array.isArray(parsedData)) return;
  db
    .changes(...parsedData.args)
    .on('change', change => {
      self.postMessage(
        JSON.stringify({
          type: 'change',
          changesId: parsedData.changesId,
          data: change,
        })
      );
    })
    .on('complete', info => {
      self.postMessage(
        JSON.stringify({
          type: 'complete',
          changesId: parsedData.changesId,
          data: info,
        })
      );
    })
    .on('error', error => {
      self.postMessage(
        JSON.stringify({
          type: 'error',
          changesId: parsedData.changesId,
          data: error,
        })
      );
    });
});
