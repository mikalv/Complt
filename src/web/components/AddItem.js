import React from 'react';
import Form from 'react-form/lib/form';
import Assignment from 'react-icons/lib/md/assignment';
import Done from 'react-icons/lib/md/done';
import Label from 'react-icons/lib/md/label';
import Send from 'react-icons/lib/md/send';
import IconButton from './IconButton';
import FormTextField from './FormTextField';
import './AddItem.scss';

const AddItem = props => (
  <Form
    defaultValues={{
      input: '',
      isProject: props.initialIsProject || false,
    }}
  >
    {({ values: { isProject, input }, setValue, submitForm }) => (
      <form
        onSubmit={(e) => {
          submitForm(e);
          import('../../common/utils/processItem').then(({ default: processItem }) => {
            const item = processItem(input, isProject);
            if (item) {
              props.onAddItem(item);
              setValue('input', '');
            }
          });
        }}
        className="md-drawer-relative AddItem"
      >
        <div className="flex column">
          <FormTextField
            id="add-item-input"
            className="AddItem-input"
            placeholder={isProject ? 'e.g. Report' : 'e.g. Finish Report @work !tomorrow at 8am!'}
            field="input"
          />
          <div className="flex row space-between">
            <div>
              <IconButton className="IconButton-margin" id="add-tag" onClick={() => setValue('input', `${input} @`)}>
                <Label />
              </IconButton>
            </div>
            <div className="flex row">
              {props.canChangeType ? <IconButton className="IconButton-margin" onClick={() => setValue('isProject', !isProject)}>
                {isProject ? <Done /> : <Assignment />}
              </IconButton> : null}
              <IconButton className="IconButton-margin" id="add-item-submit" type="submit" onClick={submitForm}>
                <Send />
              </IconButton>
            </div>
          </div>
        </div>
      </form>
  )}
  </Form>
);

export default AddItem;
