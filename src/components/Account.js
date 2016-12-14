import React from 'react';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import SocialPerson from 'material-ui/svg-icons/social/person';
import Auth0 from 'auth0-js';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../redux/actions';
import UserQuery from '../graphql/user.gql';
import './Account.css';

const Account = props => (
  <div className="flex center column text-center">
    {props.data.user ? <h1>{props.data.user.name}</h1> : ''}
    {props.data.loading ? <h1>Loading...</h1> : ''}
    <p>{props.data.user ? props.data.user.email : ''}</p>
    <div>
      <Avatar src={props.data.user ? props.data.user.picture : ''} icon={<SocialPerson />} size={150} />
    </div>
    <FlatButton
      label="Sign Out"
      labelPosition="after"
      primary
      onTouchTap={() => {
        props.logout();
        const clientID = 'GfMoEkzkCGYB9p1cyQ042XyVshskXt8p';
        const auth0 = new Auth0({
          domain: 'oakapp.auth0.com',
          clientID,
        });
        auth0.logout({ returnTo: window.location.href, client_id: clientID }, { version: 'v2' });
      }}
      icon={<SocialPerson />}
    />
  </div>
);

Account.propTypes = {
  logout: React.PropTypes.func,
  data: React.PropTypes.shape({
    loading: React.PropTypes.bool,
    user: React.PropTypes.shape({
      picture: React.PropTypes.string,
      name: React.PropTypes.string,
      email: React.PropTypes.string,
    }),
  }),
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default compose(
  graphql(UserQuery),
  connect(undefined, mapDispatchToProps)
)(Account);
