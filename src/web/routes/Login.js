import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-md/lib/Buttons/Button';
import WebAuth from 'auth0-js/src/web-auth';
import mapDispatchToProps from '../../common/utils/mapDispatchToProps';
import logException from '../../common/utils/logException';
import getTokenInfo from '../../common/utils/getTokenInfo';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
    const audience = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo`;
    this.auth0 = new WebAuth({
      domain: process.env.REACT_APP_AUTH0_DOMAIN,
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      redirectUri: window.location.href,
      responseType: 'id_token',
      scope: 'openid',
      audience,
    });
    this.loginCallback = this.loginCallback.bind(this);
  }
  componentDidMount() {
    this.auth0.parseHash(window.location.hash, this.loginCallback);
  }
  loginWithGoogle() {
    if (!process.env.REACT_APP_ELECTRON) {
      this.auth0.authorize({
        connection: 'google-oauth2',
      });
    } else {
      this.auth0.popup.authorize({
        connection: 'google-oauth2',
      }, this.loginCallback);
    }
  }
  loginCallback(error, result) {
    if (error) {
      logException(error);
      return;
    }
    if (!result) return;
    this.props.login(result.idToken);
    getTokenInfo(result.idToken).then(profile => this.props.getProfile(profile));
    this.props.history.push('/');
  }
  render() {
    return (
      <div className="flex row center" style={{ paddingTop: '100px' }}>
        <div className="flex column center">
          <Button raised label="Login With Google" onClick={this.loginWithGoogle} />
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  login: React.PropTypes.func,
  getProfile: React.PropTypes.func,
  history: React.PropTypes.shape({
    push: React.PropTypes.func,
  }),
};

export default connect(undefined, mapDispatchToProps)(Login);
