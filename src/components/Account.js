import React from 'react';
import Avatar from 'react-md/lib/Avatars';
import Button from 'react-md/lib/Buttons/Button';
import FontIcon from 'react-md/lib/FontIcons';
import Auth0 from 'auth0-js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../redux/actions';

export const Account = props => (
  <div className="flex center column text-center" style={{ paddingTop: '100px' }}>
    <h1>{props.user.name}</h1>
    <p>{props.user.email}</p>
    <div>
      <Avatar alt="User Profile Photo" src={props.user.picture} icon={<FontIcon>person</FontIcon>} style={{ height: '150px', width: '150px' }} />
    </div>
    <div><Button
      label="Sign Out"
      flat
      onClick={() => {
        props.logout();
        const auth0 = new Auth0({
          domain: process.env.REACT_APP_AUTH0_DOMAIN,
          clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
        });
        auth0.logout({ returnTo: window.location.href, client_id: process.env.REACT_APP_AUTH0_CLIENT_ID }, { version: 'v2' });
      }}
    /></div>
  </div>
);

Account.propTypes = {
  logout: React.PropTypes.func,
  user: React.PropTypes.shape({
    picture: React.PropTypes.string,
    name: React.PropTypes.string,
    email: React.PropTypes.string,
  }),
};

function mapStateToProps(state) {
  return {
    user: state.profile,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);
