import React from 'react';
import Dialog from 'react-md/lib/Dialogs';
import DialogFooter from 'react-md/lib/Dialogs/DialogFooter';
import TextField from 'react-md/lib/TextFields';
import Button from 'react-md/lib/Buttons';
import { Form, FormInput } from 'react-form';
import { connect } from 'react-redux';
import mapDispatchToProps from '../../common/utils/mapDispatchToProps';
import PropTypes from '../../common/PropTypes';

export const FormTextField = ({ field, ...rest }) => (
  <FormInput field={field}>
    {({ setValue, getValue, setTouched }) => (
      <TextField
        {...rest}
        value={getValue()}
        onChange={val => setValue(val)}
        onBlur={() => setTouched()}
      />)}
  </FormInput>
);


FormTextField.propTypes = { field: React.PropTypes.string };

export const onSubmit = (item, handleUpdateItem) => ({ input }) => handleUpdateItem(input, item);

export const UpdateItemForm = props => (
  <Form
    defaultValues={{
      input: props.defaultInputValue,
    }}
    onSubmit={onSubmit}
  >
    {({ values, submitForm, setValue }) => (

      <form onSubmit={submitForm}>
        <TextField
          placeholder={props.item.isProject ? 'e.g. Report' : 'e.g. Finish Report @work'}
          value={values.input}
          onChange={value => setValue('input', value)}
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
  handleUpdateItem: React.PropTypes.func, // eslint-disable-line react/no-unused-prop-types
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
    const defaultInputValue = `${item.name} ${tags.join(' ')}`;
    return {
      visible: true,
      item,
      defaultInputValue,
    };
  }
  return { visible: false, defaultInputValue: '', item: {} };
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateItemDialog);
