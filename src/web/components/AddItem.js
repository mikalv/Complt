import { h, Component } from 'preact';
import linkState from 'linkstate';
import { MDCTextfield } from '@material/textfield';
import Assignment from 'react-icons/lib/md/assignment';
import Done from 'react-icons/lib/md/done';
import Label from 'react-icons/lib/md/label';
import Send from 'react-icons/lib/md/send';
import IconButton from './IconButton';
import './AddItem.scss';

class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      isProject: props.initialIsProject || false,
    };
  }
  componentDidMount() {
    this.MDTextfield = new MDCTextfield(this.textfield);
  }
  componentWillReceiveProps = nextProps => {
    if (nextProps.initialIsProject !== this.props.initialIsProject) {
      this.setState({ isProject: nextProps.initialIsProject || false });
    }
  };
  onFormSubmit = e => {
    e.preventDefault();
    import(
      '../../common/utils/processItem'
    ).then(({ default: processItem }) => {
      const item = processItem(this.state.input, this.state.isProject);
      if (item) {
        this.props.onAddItem(item);
        this.resetValue();
      }
    });
  };
  resetValue = () => this.setState({ input: '' });
  addTag = () => this.setState({ input: `${this.state.input} @` });
  toggleIsProject = () => this.setState({ isProject: !this.state.isProject });
  render(props, state) {
    return (
      <form onSubmit={this.onFormSubmit} className="AddItem">
        <div className="flex column">
          <div
            className="mdc-textfield"
            ref={textfield => {
              this.textfield = textfield;
            }}
          >
            <input
              type="text"
              id="add-item-input"
              className="mdc-textfield__input AddItem-input"
              value={state.input}
              onChange={linkState(this, 'input')}
              aria-controls="add-item-helptext"
            />
            <label className="mdc-textfield__label" htmlFor="add-item-input">
              {`Add a ${this.state.isProject ? 'Project' : 'Task'}`}
            </label>
          </div>
          <p className="mdc-textfield-helptext" id="add-item-helptext">
            {state.isProject
              ? 'e.g. Report'
              : 'e.g. Finish Report @work !tomorrow at 8am!'}
          </p>
          <div className="flex row space-between">
            <div>
              <IconButton
                type="button"
                className="IconButton-margin"
                id="add-tag"
                title="Add Tag"
                onClick={this.addTag}
              >
                <Label />
              </IconButton>
            </div>
            <div className="flex row">
              {props.canChangeType
                ? <IconButton
                    type="button"
                    className="IconButton-margin"
                    title={`Switch to creating a ${state.isProject ? 'task' : 'project'}`}
                    onClick={this.toggleIsProject}
                  >
                    {state.isProject ? <Done /> : <Assignment />}
                  </IconButton>
                : null}
              <IconButton
                className="IconButton-margin"
                id="add-item-submit"
                title="Create Item"
                type="submit"
              >
                <Send />
              </IconButton>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default AddItem;
