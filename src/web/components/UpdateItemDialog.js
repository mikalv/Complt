import React from 'react';
import Dialog from 'react-md/lib/Dialogs';
import DialogFooter from 'react-md/lib/Dialogs/DialogFooter';
import Button from 'react-md/lib/Buttons/Button';
import Form from 'react-form/lib/form';
import { connect } from 'react-redux';
import FormTextField from './FormTextField';
import mapDispatchToProps from '../../common/utils/mapDispatchToProps';
import getNextDueDate from '../../common/utils/getNextDueDate';

export const onSubmit = (item, handleUpdateItem) => ({ input }) => handleUpdateItem(input, item);

export const UpdateItemForm = props => (
  <Form
    defaultValues={{
      input: props.defaultInputValue,
    }}
    onSubmit={onSubmit(props.item, props.handleUpdateItem)}
  >
    {({ submitForm }) => (
      <form onSubmit={submitForm}>
        <FormTextField
          placeholder={props.item.isProject ? 'e.g. Report' : 'e.g. Finish Report @work !tomorrow at 8am!'}
          field="input"
        />
        <DialogFooter
          className="UpdateItemDialog-footer"
          actions={[
            <Button flat label="Cancel" onClick={props.hideUpdateItemDialog} />,
            <Button flat label="Update" onClick={submitForm} />,
          ]}
        />
      </form>
    )}
  </Form>
);

export const UpdateItemDialog = props => (
  <Dialog
    id="Update Item Dialog"
    visible={props.visible}
    title="Update your Item"
    onHide={props.hideUpdateItemDialog}
    contentStyle={{ paddingBottom: 0 }}
  >
    <UpdateItemForm {...props} />
  </Dialog>
);

export function mapStateToProps(state) {
  if (state.dialogs.updateItem.visible) {
    const item = state.items.find(({ _id }) => _id === state.dialogs.updateItem.id);
    const tags = item.tags || [];
    const date = item.dates && item.dates.length !== 0 ? ` !${new Date(getNextDueDate(item.dates)).toString()}!` : '';
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
