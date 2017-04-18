import React from 'react';
import Person from 'react-icons/lib/md/person';
import Avatar from 'react-md/lib/Avatars/Avatar';
import Button from 'react-md/lib/Buttons/Button';
import { connect } from 'react-redux';
import mapDispatchToProps from '../../common/utils/mapDispatchToProps';
import PropTypes from '../../common/PropTypes';
import './Account.scss';

export const Account = props => (
  <div className="flex-child flex center column text-center">
    <h1>{props.user.name}</h1>
    <p>{props.user.email}</p>
    <div>
      <Avatar alt="User Profile Photo" src={props.user.picture} icon={<Person size={100} />} className="Account-avatar" />
    </div>
    <div><Button
      label="Sign Out"
      flat
      onClick={() => {
        props.logout();
        import('auth0-js/src/web-auth').then((WebAuth) => {
          const auth0 = new WebAuth({
            domain: process.env.REACT_APP_AUTH0_DOMAIN,
            clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
          });
          auth0.logout({ returnTo: window.location.href, client_id: process.env.REACT_APP_AUTH0_CLIENT_ID }, { version: 'v2' });
        });
      }}
    /></div>
  </div>
);

Account.propTypes = {
  logout: React.PropTypes.func,
  user: PropTypes.profile,
};

function mapStateToProps(state) {
  return {
    user: state.profile,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);
