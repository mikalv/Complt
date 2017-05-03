import { h, Component } from 'preact';
import { getCurrentUrl, route } from 'preact-router';
import Menu from 'preact-icons/lib/md/menu';
import Sync from 'preact-icons/lib/md/sync';
import Toolbar from 'preact-material-components/Toolbar';
import Drawer from 'preact-material-components/Drawer';
import Select from 'preact-material-components/Select';
import { connect } from 'preact-redux';
import Loadable from 'react-loadable';
import Spinner from '../components/Spinner';
import IconButton from '../components/IconButton';
import AppRouter from '../AppRouter';
import NavItems from '../components/NavItems';
import MatchMedia from '../MatchMedia';
import { values as itemsToShowValues } from '../../common/redux/itemsToShow';
import mapDispatchToProps from '../../common/utils/mapDispatchToProps';
import './App.scss';

const Dialogs = Loadable({
  loader: () => import('../components/Dialogs'),
  LoadingComponent: () => null,
  webpackRequireWeakId: () => require.resolveWeak('../components/Dialogs'),
});

const redirects = [
  ['project/inbox', '/inbox'],
  ['project/root', '/projects'],
  ['', '/inbox'],
];

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
  onMenuButtonClick = () => {
    this.drawer.MDComponent.open = !this.drawer.MDComponent.open;
  };
  performRedirects = url => {
    redirects.forEach(redirect => {
      if (redirect[0] === url.replace(/(^\/+|\/+$)/g, ''))
        route(redirect[1], true);
    });
  };
  render(props) {
    return (
      <div className="App">
        <Toolbar fixed>
          <Toolbar.Row>
            <Toolbar.Section align-start className="App-toolbar-section">
              {props.matches
                ? null
                : <IconButton
                    title={`${this.drawer && this.drawer.MDComponent.open ? 'Close' : 'Open'} navigation drawer`}
                    onClick={this.onMenuButtonClick}
                  >
                    <Menu />
                  </IconButton>}
              <Select
                ref={select => {
                  this.select = select;
                }}
                hintText={props.itemsToShow}
                id="items-to-show-select"
                onChange={() =>
                  props.changeItemsToShow(this.select.MDComponent.value)}
              >
                {itemsToShowValues.map(item => (
                  <Select.Item>{item}</Select.Item>
                ))}
              </Select>
            </Toolbar.Section>
            <Toolbar.Section align-end className="App-toolbar-section">
              {props.syncState.syncing
                ? <Spinner id="syncing-spinner" size={24} />
                : <IconButton title="Sync items" onClick={props.attemptSync}>
                    <Sync />
                  </IconButton>}
            </Toolbar.Section>
          </Toolbar.Row>
        </Toolbar>
        <div className="flex App-content">
          {props.matches
            ? <Drawer.PermanentDrawer>
                <Toolbar className="mdc-theme--text-primary-on-accent mdc-theme--accent-bg">
                  <Toolbar.Row />
                  <Toolbar.Row>
                    {props.profile.name}
                  </Toolbar.Row>
                </Toolbar>
                <NavItems activeClassName="mdc-permanent-drawer--selected" />
              </Drawer.PermanentDrawer>
            : <Drawer.TemporaryDrawer
                ref={drawer => {
                  this.drawer = drawer;
                }}
              >
                <Drawer.TemporaryDrawerHeader className="mdc-theme--accent-bg">
                  {props.profile.name}
                </Drawer.TemporaryDrawerHeader>
                <Drawer.TemporaryDrawerContent>
                  <NavItems
                    onListClick={() => {
                      this.drawer.MDComponent.open = false;
                    }}
                    activeClassName="mdc-temporary-drawer--selected"
                  />
                </Drawer.TemporaryDrawerContent>
              </Drawer.TemporaryDrawer>}
          <main className="flex-child flex mdc-toolbar-fixed-adjust">
            <AppRouter onChange={this.onRouteChange} />
          </main>
        </div>
        <Dialogs />
      </div>
    );
  }
}

function mapStateToProps({ toasts, itemsToShow, syncState, profile }) {
  return { toasts, itemsToShow, syncState, profile };
}

export default MatchMedia('(min-width: 600px)')(
  connect(mapStateToProps, mapDispatchToProps)(App)
);
