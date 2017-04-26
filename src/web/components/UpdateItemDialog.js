import React from 'react';
import Dialog from 'preact-material-components/Dialog';
import Form from 'react-form/lib/form';
import { connect } from 'preact-redux';
import DialogContainer from './Dialog';
import FormTextField from './FormTextField';
import mapDispatchToProps from '../../common/utils/mapDispatchToProps';
import getNextDueDate from '../../common/utils/getNextDueDate';

export const onSubmit = (item, handleUpdateItem) => ({ input }) =>
  handleUpdateItem(input, item);

export const UpdateItemForm = props => (
  <Form
    defaultValues={{
      input: props.defaultInputValue,
    }}
    onSubmit={onSubmit(props.item, props.handleUpdateItem)}
  >
    {({ submitForm }) => (
      <form onSubmit={submitForm}>
        <Dialog.Body>
          <FormTextField
            className="full-width"
            placeholder={
              props.item.isProject
                ? 'e.g. Report'
                : 'e.g. Finish Report @work !tomorrow at 8am!'
            }
            field="input"
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
          <Dialog.FooterButton type="submit" accept onClick={submitForm}>
            Update
          </Dialog.FooterButton>
        </Dialog.Footer>
      </form>
    )}
  </Form>
);

export const UpdateItemDialog = props => (
  <DialogContainer
    id="Update Item Dialog"
    visible={props.visible}
    onHide={props.hideUpdateItemDialog}
  >
    <Dialog.Header>Update Item</Dialog.Header>
    <UpdateItemForm {...props} />
  </DialogContainer>
);

export function mapStateToProps(state) {
  if (state.dialogs.updateItem.visible) {
    const item = state.items.find(
      ({ _id }) => _id === state.dialogs.updateItem.id
    );
    const tags = item.tags || [];
    const date = item.dates && item.dates.length !== 0
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
