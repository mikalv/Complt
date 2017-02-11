import PouchDB from '../PouchDB';
import db from '../db';

const pouchDBSync = (token, remoteURI) => new Promise((resolve, reject) => {
  const remoteDB = new PouchDB(remoteURI, {
    ajax: { headers: { Authorization: `Bearer ${token}` } },
    skipSetup: true,
  });
  PouchDB.sync(db, remoteDB)
    .on('error', reject)
    .on('complete', resolve);
});

export default pouchDBSync;
