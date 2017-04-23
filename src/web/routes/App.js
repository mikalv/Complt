/** @jsx h */
import { h, Component } from 'preact';
import { getCurrentUrl, route } from 'preact-router';
import Menu from 'react-icons/lib/md/menu';
import Sync from 'react-icons/lib/md/sync';
import Toolbar from 'preact-material-components/Toolbar';
import Drawer from 'preact-material-components/Drawer';
import Select from 'preact-material-components/Select';
import { connect } from 'react-redux';
import Loadable from 'react-loadable';
import Spinner from '../components/Spinner';
import IconButton from '../components/IconButton';
import AppRouter from '../AppRouter';
import NavItems from '../components/NavItems';
import { values as itemsToShowValues } from '../../common/redux/itemsToShow';
import mapDispatchToProps from '../../common/utils/mapDispatchToProps';
import './App.scss';

const Dialogs = Loadable({
  loader: () => import('../components/Dialogs'),
  LoadingComponent: () => null,
  webpackRequireWeakId: () => require.resolveWeak('../components/Dialogs'),
});

const redirects = [['project/inbox', '/inbox'], ['project/root', '/projects'], ['', '/inbox']];

export class App extends Component {
  componentDidMount() {
    const currentUrl = getCurrentUrl();
    this.performRedirects(currentUrl);
  }
  onRouteChange = ({ url }) => {
    window.ga('set', 'page', url);
    window.ga('send', 'pageview');
    this.performRedirects(url);
  };
  performRedirects = (url) => {
    redirects.forEach((redirect) => {
      if (redirect[0] === url.replace(/(^\/+|\/+$)/g, '')) route(redirect[1], true);
    });
  };
  render(props) {
    return (
      <div className="App">
        <Toolbar>
          <Toolbar.Row>
            <Toolbar.Section align-start className="App-toolbar-section">
              <IconButton
                onClick={() => {
                  this.drawer.MDComponent.open = !this.drawer.MDComponent.open;
                }}
              >
                <Menu />
              </IconButton>
              <Select
                ref={(select) => {
                  this.select = select;
                }}
                hintText={props.itemsToShow}
                id="items-to-show-select"
                onChange={() => props.changeItemsToShow(this.select.MDComponent.value)}
              >
                {itemsToShowValues.map(item => <Select.Item>{item}</Select.Item>)}
              </Select>
            </Toolbar.Section>
            <Toolbar.Section align-end className="App-toolbar-section">
              {props.syncState.syncing
                ? <div className="">
                  <Spinner id="syncing-spinner" size={24} />
                </div>
                : <IconButton onClick={props.attemptSync}><Sync /></IconButton>}
            </Toolbar.Section>
          </Toolbar.Row>
        </Toolbar>
        <Drawer.TemporaryDrawer
          ref={(drawer) => {
            this.drawer = drawer;
            global.drawer = drawer;
          }}
        >
          <Drawer.TemporaryDrawerHeader className="mdc-theme--accent-bg">
            {props.profile.name}
          </Drawer.TemporaryDrawerHeader>
          <Drawer.TemporaryDrawerContent>
            <NavItems activeClassName="mdc-temporary-drawer--selected" />
          </Drawer.TemporaryDrawerContent>
        </Drawer.TemporaryDrawer>
        <main>
          <AppRouter onChange={this.onRouteChange} />
        </main>
        <Dialogs />
      </div>
    );
  }
}

function mapStateToProps({ toasts, itemsToShow, syncState, profile }) {
  return { toasts, itemsToShow, syncState, profile };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
