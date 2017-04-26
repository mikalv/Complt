/** @jsx h */
import { h } from 'preact';
import Person from 'preact-icons/lib/md/person';
import Button from 'preact-material-components/Button';
import { connect } from 'preact-redux';
import mapDispatchToProps from '../../common/utils/mapDispatchToProps';
import './Account.scss';

const renderAvatar = picture => {
  if (picture) {
    return <img className="Account-avatar" alt="User Profile" src={picture} />;
  }
  return (
    <div className="Account-avatar Account-avatar-icon">
      <Person size={67} />
    </div>
  );
};

export const Account = props => (
  <div className="flex-child flex center column text-center">
    <h1>{props.user.name}</h1>
    <p>{props.user.email}</p>
    <div className="Account-avatar-container">
      {renderAvatar(props.user.picture)}
    </div>
    <div>
      <Button
        ripple
        primary
        onClick={() => {
          props.logout();
          import('auth0-js/src/web-auth').then(WebAuth => {
            const auth0 = new WebAuth({
              domain: process.env.REACT_APP_AUTH0_DOMAIN,
              clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
            });
            auth0.logout(
              {
                returnTo: window.location.href,
                client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
              },
              { version: 'v2' }
            );
          });
        }}
      >
        Sign Out
      </Button>
    </div>
  </div>
);

function mapStateToProps(state) {
  return {
    user: state.profile,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);
