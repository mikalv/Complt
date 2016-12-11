/* eslint-disable  no-undef */
import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import IconButton from 'material-ui/IconButton';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import DrawerContent from './components/DrawerContent';
import './App.css';

export class App extends Component {
  componentWillMount() {
    this.windowResize();
    window.addEventListener('resize', () => this.windowResize());
  }
  componentWillUnmount() {
    window.removeEventListener('resize', () => this.windowResize());
  }
  windowResize() {
    if (window.innerWidth >= 768) {
      if (!this.props.drawer.isDocked) {
        this.props.dockDrawer(true);
      }
    } else if (this.props.drawer.isDocked) {
      this.props.dockDrawer(false);
    }
  }
  render() {
    return (
      <div>
        <Drawer
          docked={this.props.drawer.isDocked}
          onRequestChange={this.props.toggleDrawer}
          open={this.props.drawer.isOpen}
          swipeAreaWidth={50}
          zDepth={this.props.drawer.isDocked ? 0 : 2}
        >
          <DrawerContent
            onLocationTap={(newLocation) => {
              if (!this.props.drawer.isDocked) this.props.toggleDrawer();
              this.props.router.push(newLocation);
            }}
          />
        </Drawer>
        <AppBar
          title="Oak" className="drawer-margin App-bar"
          onLeftIconButtonTouchTap={this.props.toggleDrawer}
          iconElementLeft={this.props.drawer.isDocked ?
            <div /> : <IconButton disableTouchRipple><NavigationMenu /></IconButton>}
        />
        <div className="drawer-margin App-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node,
  toggleDrawer: React.PropTypes.func,
  dockDrawer: React.PropTypes.func,
  drawer: React.PropTypes.shape({
    isOpen: React.PropTypes.bool,
    isDocked: React.PropTypes.bool,
  }),
  router: React.PropTypes.shape({
    push: React.PropTypes.func,
  }),
};

function mapStateToProps(state) {
  return {
    drawer: state.drawer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
