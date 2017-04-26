import { h, Component } from 'preact';
import linkState from 'linkstate';
import Textfield from 'preact-material-components/Textfield';
import Assignment from 'preact-icons/lib/md/assignment';
import Done from 'preact-icons/lib/md/done';
import Label from 'preact-icons/lib/md/label';
import Send from 'preact-icons/lib/md/send';
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
          <Textfield
            id="add-item-input"
            className="AddItem-input"
            placeholder={
              state.isProject
                ? 'e.g. Report'
                : 'e.g. Finish Report @work !tomorrow at 8am!'
            }
            value={state.input}
            onChange={linkState(this, 'input')}
          />
          <div className="flex row space-between">
            <div>
              <IconButton
                type="button"
                className="IconButton-margin"
                id="add-tag"
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
                    onClick={this.toggleIsProject}
                  >
                    {state.isProject ? <Done /> : <Assignment />}
                  </IconButton>
                : null}
              <IconButton
                className="IconButton-margin"
                id="add-item-submit"
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
