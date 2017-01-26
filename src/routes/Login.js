import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-md/lib/Buttons/Button';
import WebAuth from 'auth0-js/src/web-auth';
import mapDispatchToProps from '../utils/mapDispatchToProps';
import logException from '../utils/logException';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
    this.auth0 = new WebAuth({
      domain: process.env.REACT_APP_AUTH0_DOMAIN,
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      redirectUri: window.location.href,
      responseType: 'id_token',
      scope: 'openid',
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
    this.props.router.push('/');
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
  router: React.PropTypes.shape({
    push: React.PropTypes.func,
  }),
};

export default connect(undefined, mapDispatchToProps)(Login);
