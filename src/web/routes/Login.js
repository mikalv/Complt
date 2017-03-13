import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapDispatchToProps from '../../common/utils/mapDispatchToProps';

export class Login extends Component {
  componentDidMount() {
    import('auth0-js/src/web-auth').then((WebAuth) => {
      const audience = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo`;
      const redirectUri = `${window.location.origin}/login`;
      const auth0 = new WebAuth({
        domain: process.env.REACT_APP_AUTH0_DOMAIN,
        clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
        redirectUri,
        responseType: 'id_token',
        scope: 'openid',
        audience,
      });
      auth0.parseHash(window.location.hash, this.props.loginCallback);
    });
  }
  render() {
    return null;
  }
}

Login.propTypes = {
  loginCallback: React.PropTypes.func,
};

export default connect(undefined, mapDispatchToProps)(Login);
