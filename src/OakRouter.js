import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import App from './App';
import Home from './components/Home';
import Inbox from './components/Inbox';
import Account from './components/Account';
import Login from './components/Login';
import isTokenExpired from './AuthUtils';

class OakRouter extends Component {
  constructor(props) {
    super(props);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }
  isAuthenticated(nextState, replace, cb) {
    window.setTimeout(() => {
      if (this.props.idToken === '' || isTokenExpired(this.props.idToken)) {
        this.props.history.push('/login');
      }
      cb();
    }, 0);
  }

  render() {
    return (
      <Router history={this.props.history}>
        <Route path="login" component={Login} />
        <Route path="/" component={App}>
          <Route onEnter={this.isAuthenticated}>
            <IndexRoute component={Home} />
            <Route path="inbox" component={Inbox} />
            <Route path="account" component={Account} />
          </Route>
        </Route>
      </Router>
    );
  }
}

OakRouter.propTypes = {
  idToken: React.PropTypes.string,
  history: React.PropTypes.shape({
    push: React.PropTypes.func,
  }),
};

function mapStateToProps(state) {
  return {
    idToken: state.auth.token.idToken,
  };
}

export default connect(mapStateToProps)(OakRouter);
