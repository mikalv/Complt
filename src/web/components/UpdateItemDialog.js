import React from 'react';
import Dialog from 'react-md/lib/Dialogs';
import DialogFooter from 'react-md/lib/Dialogs/DialogFooter';
import Button from 'react-md/lib/Buttons/Button';
import Form from 'react-form/lib/form';
import { connect } from 'react-redux';
import formatDate from 'sugar-date/date/format';
import FormTextField from './FormTextField';
import mapDispatchToProps from '../../common/utils/mapDispatchToProps';
import getNextDueDate from '../../common/utils/getNextDueDate';
import PropTypes from '../../common/PropTypes';

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
          placeholder={props.item.isProject ? 'e.g. Report' : 'e.g. Finish Report @work'}
          field="input"
        />
        <DialogFooter
          style={{ paddingRight: 0 }}
          actions={[
            <Button flat label="Cancel" onClick={props.hideUpdateItemDialog} />,
            <Button flat label="Update" onClick={submitForm} />,
          ]}
        />
      </form>
    )}
  </Form>
);

UpdateItemForm.propTypes = {
  item: PropTypes.item,
  defaultInputValue: React.PropTypes.string,
  handleUpdateItem: React.PropTypes.func,
  hideUpdateItemDialog: React.PropTypes.func,
};

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

UpdateItemDialog.propTypes = {
  visible: React.PropTypes.bool,
  hideUpdateItemDialog: React.PropTypes.func,
};

export function mapStateToProps(state) {
  if (state.dialogs.updateItem.visible) {
    const item = state.items.find(({ _id }) => _id === state.dialogs.updateItem.id);
    const tags = item.tags || [];
    const date = item.dates && item.dates.length !== 0 ? ` !${formatDate(new Date(getNextDueDate(item.dates)))}!` : '';
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
