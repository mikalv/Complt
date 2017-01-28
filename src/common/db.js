import PouchDB from './PouchDB';

global.PouchDB = PouchDB;

export default new PouchDB('items');
