import { h, Component } from 'preact';
import linkState from 'linkstate';
import Textfield from 'preact-material-components/Textfield/Textfield';
import Dialog from 'preact-material-components/Dialog/Dialog';
import { connect } from 'preact-redux';
import DialogContainer from './Dialog';
import mapDispatchToProps from '../../common/utils/mapDispatchToProps';
import getNextDueDate from '../../common/utils/getNextDueDate';

export const onSubmit = (item, handleUpdateItem) => ({ input }) =>
  handleUpdateItem(input, item);

export class UpdateItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: props.defaultInputValue || '',
    };
  }
  componentWillReceiveProps(newProps) {
    if (newProps.defaultInputValue !== this.props.defaultInputValue) {
      this.setState({ input: newProps.defaultInputValue });
    }
  }
  submitForm = e => {
    e.preventDefault();
    this.props.handleUpdateItem(this.state.input, this.props.item);
  };
  render(props, state) {
    return (
      <form onSubmit={this.submitForm}>
        <Dialog.Body>
          <Textfield
            className="full-width"
            placeholder={
              props.item.isProject
                ? 'e.g. Report'
                : 'e.g. Finish Report @work !tomorrow at 8am!'
            }
            value={state.input}
            onChange={linkState(this, 'input')}
          />
        </Dialog.Body>
        <Dialog.Footer className="UpdateItemDialog-footer">
          <Dialog.FooterButton
            type="button"
            cancel
            onClick={props.hideUpdateItemDialog}
          >
            Cancel
          </Dialog.FooterButton>
          <Dialog.FooterButton type="submit" accept onClick={this.submitForm}>
            Update
          </Dialog.FooterButton>
        </Dialog.Footer>
      </form>
    );
  }
}

export const UpdateItemDialog = props =>
  <DialogContainer
    id="Update Item Dialog"
    visible={props.visible}
    onHide={props.hideUpdateItemDialog}
  >
    <Dialog.Header>Update Item</Dialog.Header>
    <UpdateItemForm {...props} />
  </DialogContainer>;

export function mapStateToProps(state) {
  if (state.dialogs.updateItem.visible) {
    const item = state.items[state.dialogs.updateItem.id];
    const tags = item.tags || [];
    const date =
      item.dates && item.dates.length !== 0
        ? ` !${new Date(getNextDueDate(item.dates)).toString()}!`
        : '';
    const defaultInputValue = `${item.name} ${tags.join(' ')}${date}`.trim();
    return {
      visible: true,
      item,
      defaultInputValue,
    };
  }
  return { visible: false, defaultInputValue: '', item: {} };
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateItemDialog);
