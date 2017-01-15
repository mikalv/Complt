import React from 'react';
import Button from 'react-md/lib/Buttons/Button';
import { connect } from 'react-redux';
import PouchDB from 'pouchdb/lib/index-browser';
import mapDispatchToProps from '../utils/mapDispatchToProps';
import logException from '../utils/logException';
import db from '../db';

export const Settings = props => (
  <div className="flex center column text-center" style={{ paddingTop: '100px' }}>
    <div>
      <Button
        label="Sync"
        flat
        onClick={() => {
          props.showToast({ text: 'Syncing Started, Please Wait...' });
          const remoteDB = new PouchDB('https://oak-envoy.herokuapp.com/envoy', {
            ajax: {
              headers: {
                Authorization: `Bearer ${props.token}`,
              },
            },
          });

          db.sync(remoteDB).on('error', (error) => {
            if (error.status === 401) {
              props.showToast({
                text: 'Please sign in again to sync',
                action: {
                  label: 'LOG IN',
                  onCLick: () => props.router.push('/login'),
                },
              });
            }
            logException(new Error('An error occured while syncing'), error);
            props.showToast({ text: 'An error occured while syncing, please try again later' });
          }).on('complete', () => {
            props.showToast({ text: 'Syncing finished' });
          });
        }}
      />
    </div>
  </div>);


Settings.propTypes = {
  token: React.PropTypes.string,
  showToast: React.PropTypes.func,
};

function mapStateToProps(state) {
  return { token: state.auth };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
