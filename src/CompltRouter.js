import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, IndexRedirect } from 'react-router';
import App from './routes/App';
import Inbox from './routes/Inbox';
import Account from './routes/Account';
import Login from './routes/Login';
import RootProject from './routes/RootProject';
import Project from './routes/Project';
import isTokenExpired from './utils/auth';

class CompltRouter extends Component {
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
        <Route path="/" component={App}>
          <IndexRedirect to="inbox" />
          <Route path="inbox" component={Inbox} />
          <Route path="projects" component={RootProject} />
          <Route path="project/:projectId" component={Project} />
          <Route path="login" component={Login} />
          <Route onEnter={this.isAuthenticated}>
            <Route path="account" component={Account} />
          </Route>
        </Route>
      </Router>
    );
  }
}

CompltRouter.propTypes = {
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

export default connect(mapStateToProps)(CompltRouter);
