import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Auth0Lock from 'auth0-lock';
import * as actions from '../redux/actions';

class Login extends Component {
  componentWillMount() {
    if (!this.props.idToken) {
      this.lock = new Auth0Lock('GfMoEkzkCGYB9p1cyQ042XyVshskXt8p', 'oakapp.auth0.com', {
        closable: false,
        languageDictionary: {
          title: 'Oak',
        },
      });
      this.lock.show();
      this.lock.on('authenticated', (token) => {
        this.props.login(token);
        this.lock.getProfile(token.idToken,
          (error, profile) => {
            this.props.getProfile(profile);
            this.props.router.push('/');
          });
      });
    } else {
      this.props.router.push('/');
    }
  }
  componentWillUnmount() {
    if (this.lock) this.lock.hide();
  }
  render() {
    return (
      <div />
    );
  }
}

Login.propTypes = {
  getProfile: React.PropTypes.func,
  login: React.PropTypes.func,
  router: React.PropTypes.shape({
    push: React.PropTypes.func,
  }),
  idToken: React.PropTypes.string,
};

function mapStateToProps(state) {
  return {
    picture: state.auth.profile.picture,
    name: state.auth.profile.name,
    email: state.auth.profile.email,
    idToken: state.auth.token.idToken,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
