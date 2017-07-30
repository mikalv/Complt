import db from '../db';

const pouchDBSync = (token, remoteURI) =>
  import(/* webpackChunkName: "pouchdb-http" */ '../PouchDBWithHttpAndReplication').then(
    ({ default: PouchDB }) =>
      new Promise((resolve, reject) => {
        const remoteDB = new PouchDB(remoteURI, {
          ajax: { headers: { Authorization: `Bearer ${token}` } },
          skip_setup: true,
        });
        PouchDB.sync(db, remoteDB).on('error', reject).on('complete', resolve);
      })
  );

export default pouchDBSync;
