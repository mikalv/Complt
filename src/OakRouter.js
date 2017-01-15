import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, IndexRedirect } from 'react-router';
import App from './App';
import Inbox from './components/Inbox';
import Account from './components/Account';
import Login from './components/Login';
import RootProject from './components/RootProject';
import Project from './components/Project';
import Settings from './components/Settings';
import isTokenExpired from './utils/auth';

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
          <IndexRedirect to="inbox" />
          <Route path="inbox" component={Inbox} />
          <Route path="projects" component={RootProject} />
          <Route path="project/:projectId" component={Project} />
          <Route onEnter={this.isAuthenticated}>
            <Route path="settings" component={Settings} />
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
    idToken: state.auth,
  };
}

export default connect(mapStateToProps)(OakRouter);
