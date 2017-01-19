import React from 'react';
import Dialog from 'react-md/lib/Dialogs';
import TextField from 'react-md/lib/TextFields';
import Button from 'react-md/lib/Buttons';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import mapDispatchToProps from '../utils/mapDispatchToProps';
import PropTypes from '../PropTypes';


export const renderTextField = ({
  input, meta: { touched, error }, ...others  // eslint-disable-line react/prop-types
}) => (
  <TextField {...input} {...others} error={touched && !!error} errorText={error} />
);

export const UpdateItemDialog = props => (
  <Dialog
    id="Update Item Dialog"
    visible={props.visible}
    title="Update your Item"
    onHide={props.hideUpdateItemDialog}
    actions={[
      <Button flat label="Cancel" onClick={props.hideUpdateItemDialog} />,
      <Button flat label="Update" onClick={props.handleSubmit} />,
    ]}
  >
    {props.item ?
      <form onSubmit={props.handleSubmit}>
        <Field name="itemInput" component={renderTextField} type="text" placeholder={props.item.isProject ? 'e.g. Report' : 'e.g. Finish Report @work'} />
      </form>
      : null}
  </Dialog>
);

UpdateItemDialog.propTypes = {
  item: PropTypes.item,
  visible: React.PropTypes.bool,
  handleSubmit: React.PropTypes.func,
  hideUpdateItemDialog: React.PropTypes.func,
};

export function mapStateToProps(state) {
  if (state.dialogs.updateItem.visible) {
    const item = state.items.find(({ _id }) => _id === state.dialogs.updateItem.id);
    let defaultInputValue = item.name;
    if (!item.isProject) defaultInputValue = `${item.name} ${item.tags.join(' ')}`;
    return {
      visible: true,
      item,
      initialValues: {
        itemInput: defaultInputValue,
      },
      form: `updateItem:${item._id}`,
    };
  }
  return { visible: false };
}

export const onSubmit = ({ itemInput }, dispatch, props) =>
props.handleUpdateItem(itemInput, props.item);

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  onSubmit,
})(UpdateItemDialog));
