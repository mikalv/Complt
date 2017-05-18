import PromiseWorker from 'promise-worker';
import { EventEmitter } from 'events';
import DbWorker from './db.worker';

function parseJsonSafely(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return false;
  }
}

const dbWorker = new DbWorker();
const promiseWorker = new PromiseWorker(dbWorker);

export const pouchDBSync = (...args) =>
  promiseWorker.postMessage({ type: 'SYNC', args });

const generalPouch = name => (...args) => {
  if (typeof args[1] === 'function') {
    promiseWorker
      .postMessage({ args: [args[0]], name })
      .then(response => {
        args[1](undefined, response);
      })
      .catch(err => {
        args[1](err);
      });
  }
  return promiseWorker.postMessage({ args, name });
};

let changesId = 0;
const changesEmitters = {};

dbWorker.addEventListener('message', ({ data }) => {
  const parsedData = parseJsonSafely(data);
  if (!parsedData || !parsedData.changesId) return;
  changesEmitters[parsedData.changesId].emit(parsedData.type, parsedData.data);
});
const changes = (...args) => {
  changesId += 1;
  dbWorker.postMessage(JSON.stringify({ changesId, args }));
  changesEmitters[changesId] = new EventEmitter();
  return changesEmitters[changesId];
};

export const db = {
  allDocs: generalPouch('allDocs'),
  put: generalPouch('put'),
  remove: generalPouch('remove'),
  changes,
};
