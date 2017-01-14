import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from 'react-md/lib/Buttons/Button';
import Auth0 from 'auth0-js';
import * as actions from '../redux/actions';

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
        this.props.login(result.idToken);
        this.auth0.getProfile(result.idToken, (error, profile) => {
          if (error) return;
          this.props.getProfile(profile);
          this.props.router.push('/');
        });
      }, 100);
    }
  }
  loginWithGoogle() {
    this.auth0.login({
      connection: 'google-oauth2',
    });
  }
  render() {
    return (
      <div className="flex row full center">
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(undefined, mapDispatchToProps)(Login);
