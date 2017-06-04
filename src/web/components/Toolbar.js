import { h, Component } from 'preact';
import css from 'glam';
import Menu from 'react-icons/lib/md/menu';
import Sync from 'react-icons/lib/md/sync';
import Spinner from '../components/Spinner';
import IconButton from '../components/IconButton';
import { values as itemsToShowValues } from '../../common/redux/itemsToShow';
import glamComp from '../glamComp';

const HeaderContainer = glamComp('header')(css`
  display: flex;
  justify-content: space-between;
  background: linear-gradient(#9bffc5,rgb(0, 243, 255));
  padding: 16px;
  height: 24px;
`);

const HeaderSection = glamComp('div')(
  css`
  display: flex;
  flex: 1;
`,
  props => css`
  justify-content: ${props.glam && props.glam.alignEnd === true ? 'flex-end' : 'flex-start'};
`
);

const DrawerHeader = glamComp('header')(css`
  display: flex;
  flex-direction: column;
  background: linear-gradient(#9bffc5,rgb(0, 243, 255));
`);

const DrawerHeaderRow = glamComp('div')(css`
  height: 24px;
  padding: 16px;
  flex: 1;
`);

const AlignCenter = glamComp('div')(css`
  display: flex;
  justify-content: center;
  align-items: center;
`);

const importMaterialSelectPromise = import(
  /* webpackChunkName: "mdc-select" */ '@material/select'
);

export default class Toolbar extends Component {
  componentDidMount() {
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
      <HeaderContainer>
        <HeaderSection>
          {props.matches
            ? null
            : <AlignCenter
                className={css`
                                      padding-right: 8px;
                                    `}
              >
                <IconButton
                  title={`Toggle navigation drawer`}
                  onClick={props.onMenuButtonClick}
                >
                  <Menu />
                </IconButton>
              </AlignCenter>}
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
        </HeaderSection>
        <HeaderSection glam={{ alignEnd: true }}>
          <AlignCenter>
            {props.syncState.syncing
              ? <Spinner id="syncing-spinner" size={24} />
              : <IconButton title="Sync items" onClick={props.attemptSync}>
                  <Sync />
                </IconButton>}
          </AlignCenter>
        </HeaderSection>
      </HeaderContainer>
    );
  }
}
