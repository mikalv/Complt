import { h, Component } from 'preact';
import { getCurrentUrl, route } from 'preact-router';
import Menu from 'react-icons/lib/md/menu';
import Sync from 'react-icons/lib/md/sync';
import Toolbar from 'preact-material-components/Toolbar';
import { connect } from 'preact-redux';
import Async from '../components/Async';
import Spinner from '../components/Spinner';
import IconButton from '../components/IconButton';
import AppRouter from '../AppRouter';
import renderNavItems from '../components/NavItems';
import MatchMedia from '../MatchMedia';
import TemporaryDrawer from '../components/TemporaryDrawer';
import { values as itemsToShowValues } from '../../common/redux/itemsToShow';
import mapDispatchToProps from '../../common/utils/mapDispatchToProps';
import './App.scss';

const Dialogs = Async(() =>
  import(/* webpackChunkName: "dialogs" */ '../components/Dialogs')
);

const redirects = [
  ['project/inbox', '/inbox'],
  ['project/root', '/projects'],
  ['', '/inbox'],
];

const importMaterialSelectPromise = import(
  /* webpackChunkName: "mdc-select" */ '@material/select'
);

export class App extends Component {
  componentDidMount() {
    const currentUrl = getCurrentUrl();
    this.performRedirects(currentUrl);
    importMaterialSelectPromise.then(({ MDCSelect }) => {
      this.selectMDComponent = new MDCSelect(this.select);
      this.selectMDComponent.listen('MDCSelect:change', () => {
        const newValue = this.selectMDComponent.value;
        if (newValue !== this.props.itemsToShow) {
          this.props.changeItemsToShow(newValue);
        }
      });
      this.updateSelectedIndex();
    });
  }
  componentDidUpdate(prevProps) {
    this.updateSelectedIndex(prevProps);
  }
  onRouteChange = ({ url }) => {
    window.ga('set', 'page', url);
    window.ga('send', 'pageview');
    this.performRedirects(url);
  };
  onMenuButtonClick = () => {
    this.drawer.toggleDrawer();
  };
  performRedirects = url => {
    redirects.forEach(redirect => {
      if (redirect[0] === url.replace(/(^\/+|\/+$)/g, ''))
        route(redirect[1], true);
    });
  };
  updateSelectedIndex = prevProps => {
    if (
      this.selectMDComponent !== undefined &&
      (prevProps && prevProps.itemsToShow) !== this.props.itemsToShow
    ) {
      const newIndex = itemsToShowValues.indexOf(this.props.itemsToShow);
      if (newIndex !== this.selectMDComponent.selectedIndex) {
        this.selectMDComponent.selectedIndex = newIndex;
      }
    }
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
                    title={`Toggle navigation drawer`}
                    onClick={this.onMenuButtonClick}
                  >
                    <Menu />
                  </IconButton>}
              <div
                className="mdc-select"
                role="listbox"
                id="items-to-show-select"
                tabIndex="0"
                ref={select => {
                  this.select = select;
                }}
              >
                <span className="mdc-select__selected-text">
                  {props.itemsToShow}
                </span>
                <div className="mdc-simple-menu mdc-select__menu">
                  <ul className="mdc-list mdc-simple-menu__items">
                    {itemsToShowValues.map((item, i) => (
                      <li
                        className="mdc-list-item"
                        role="option"
                        tabIndex="0"
                        aria-selected={
                          itemsToShowValues.indexOf(props.itemsToShow) === i
                        }
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
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
            ? <nav className="mdc-typography mdc-permanent-drawer">
                <div className="mdc-permanent-drawer__content">
                  <Toolbar className="mdc-theme--text-primary-on-accent mdc-theme--accent-bg">
                    <Toolbar.Row />
                    <Toolbar.Row>
                      {props.profile.name}
                    </Toolbar.Row>
                  </Toolbar>
                  <nav className="mdc-list">
                    {renderNavItems({
                      activeClassName: 'mdc-permanent-drawer--selected',
                    })}
                  </nav>
                </div>
              </nav>
            : <TemporaryDrawer
                onClick={e => {
                  e.stopPropagation();
                  if (e.target.nodeName === 'A') {
                    this.drawer.toggleDrawer();
                  }
                }}
                ref={drawer => {
                  this.drawer = drawer;
                }}
              >
                <Toolbar className="mdc-theme--text-primary-on-accent mdc-theme--accent-bg">
                  <Toolbar.Row />
                  <Toolbar.Row>
                    {props.profile.name}
                  </Toolbar.Row>
                </Toolbar>
                <nav className="mdc-list mdc-temporary-drawer__content">
                  {renderNavItems({
                    activeClassName: 'mdc-temporary-drawer--selected',
                  })}
                </nav>
              </TemporaryDrawer>}
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
