import React, { Component } from 'react';
import db from '../../common/db';

const PouchDBHOC = getIds => WrappedComponent =>
  class PouchDB extends Component {
    state = {
      items: [],
    }
    componentWillMount() {
      const ids = getIds(this.props);
      Promise.all(ids.map(id => db.get(id))).then((items) => {
        this.setState({ items }, () => {
          this.listener = db.changes({
            include_docs: true,
            since: 'now',
            live: true,
            doc_ids: ids,
          }).on('change', (thing) => {
            const newItems = [...this.state.items.filter(({ _id }) => thing.id !== _id), thing.doc];
            this.setState({ items: newItems });
          });
        });
      });
    }
    compoentWillUnmount() {
      this.listener.cancel();
    }
    render() {
      return (<WrappedComponent {...this.props} items={this.state.items} />);
    }
  };


export default PouchDBHOC;
