import React, { Component } from 'react';
import db from './db';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function removeByKey(obj, deleteKey) {
  return Object.keys(obj)
    .filter(key => key !== deleteKey)
    .reduce((result, current) => {
      result[current] = obj[current]; // eslint-disable-line no-param-reassign
      return result;
    }, {});
}

export default (id, options) => (WrappedComponent) => {
  class PouchDB extends Component {
    componentWillMount() {
      db.get(id, { include_docs: true }).catch((err) => {
        console.log(err);
        if (err.status === 404 && (id === 'inbox' || id === 'root')) {
          return db.put({
            _id: id,
            children: [],
          });
        }
        throw err;
      }).then((doc) => {
        console.log(doc);
        this.setState({ [id]: doc });
        doc.children.forEach((childId) => {
          db.get(childId, { include_docs: true }).then((child) => {
            const _id = child._id;
            this.setState({ [_id]: child });
          });
        });
      });
      db.changes({ live: true, since: 'now', include_docs: true }).on('change', (change) => {
        if (!change.deleted) {
          if (Object.keys(this.state).indexOf(change.doc._id) !== -1) {
            this.setState({ [change.doc._id]: change.doc });
          }
        }
      }).on('error', err => console.log(err));
    }
    render() {
      let data;
      if (this.state[id]) {
        if (options.includeChildren) {
          const children = this.state[id].children.map(idInMap => this.state[idInMap]);
          data = { ...this.state[id], children };
        } else data = this.state[id];
      } else data = { children: [] };
      console.log(data);
      debugger;
      return (
        <WrappedComponent
          data={data}
          {...this.props}
        />);
    }
  }
  PouchDB.displayName = `PouchDB(${getDisplayName(WrappedComponent)})`;
  return PouchDB;
};
