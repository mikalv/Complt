import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-md/lib/Buttons/Button';
import Auth0 from 'auth0-js';
import mapDispatchToProps from '../utils/mapDispatchToProps';
import logException from '../utils/logException';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
    this.auth0 = new Auth0({
      domain: process.env.REACT_APP_AUTH0_DOMAIN,
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      callbackURL: window.location.href,
      responseType: 'token',
    });
  }
  componentDidMount() {
    const result = this.auth0.parseHash(window.location.hash);
    if (result && result.idToken) {
      setTimeout(() => {
        this.loginCallback(result);
      }, 100);
    }
  }
  loginWithGoogle() {
    this.auth0.login({
      connection: 'google-oauth2',
      popup: process.env.REACT_APP_ELECTRON,
    }, (error, result) => {
      if (error) {
        logException(error);
        return;
      }
      this.loginCallback(result);
    });
  }
  loginCallback(result) {
    this.props.login(result.idToken);
    this.auth0.getProfile(result.idToken, (profileError, profile) => {
      if (profileError) {
        logException(profileError);
        return;
      }
      this.props.getProfile(profile);
      this.props.router.push('/');
    });
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
  router: React.PropTypes.shape({
    push: React.PropTypes.func,
  }),
};

export default connect(undefined, mapDispatchToProps)(Login);
