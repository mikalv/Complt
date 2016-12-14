import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import Auth0 from 'auth0-js';
import * as actions from '../redux/actions';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
    this.auth0 = new Auth0({
      domain: 'oakapp.auth0.com',
      clientID: 'GfMoEkzkCGYB9p1cyQ042XyVshskXt8p',
      callbackURL: window.location.href,
      responseType: 'token',
    });
  }
  componentDidMount() {
    const result = this.auth0.parseHash(window.location.hash);
    if (result && result.idToken) {
      setTimeout(() => {
        this.props.login(result);
        this.props.router.push('/');
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
          <RaisedButton label="Login With Google" onTouchTap={this.loginWithGoogle} />
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(undefined, mapDispatchToProps)(Login);
