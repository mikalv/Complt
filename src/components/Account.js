import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import SocialPerson from 'material-ui/svg-icons/social/person';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../redux/actions';
import './Account.css';

class Account extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  logout() {
    this.props.logout();
    window.location.reload();
  }
  render() {
    return (
      <div className="Account-container">
        <h1 className="Account-item">{this.props.name}</h1>
        <p className="Account-item">{this.props.email}</p>
        <div className={'Account-icon-container'}>
          <Avatar src={this.props.picture} icon={<SocialPerson />} size={150} />
        </div>
        <FlatButton
          label="Sign Out"
          labelPosition="after"
          primary
          onTouchTap={this.logout}
          icon={<SocialPerson />}
        />
      </div>
    );
  }
}

Account.propTypes = {
  logout: React.PropTypes.func,
  picture: React.PropTypes.string,
  name: React.PropTypes.string,
  email: React.PropTypes.string,
};

function mapStateToProps(state) {
  return {
    picture: state.auth.profile.picture,
    name: state.auth.profile.name,
    email: state.auth.profile.email,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);
