import React from 'react';
import Form from 'react-form/lib/form';
import Assignment from 'react-icons/lib/md/assignment';
import Done from 'react-icons/lib/md/done';
import Label from 'react-icons/lib/md/label';
import Send from 'react-icons/lib/md/send';
import Paper from 'react-md/lib/Papers/Paper';
import Button from 'react-md/lib/Buttons/Button';
import FormTextField from './FormTextField';
import './AddItem.css';

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
      >
        <Paper zDepth={2} style={{ padding: 10, backgroundColor: '#fff' }} className="md-drawer-relative">
          <div className="flex column">
            <FormTextField
              id="add-item-input"
              placeholder={isProject ? 'e.g. Report' : 'e.g. Finish Report @work'}
              field="input"
            />
            <div className="flex row space-between">
              <div>
                <Button id="add-tag" icon onClick={() => setValue('input', `${input} @`)}>
                  <Label />
                </Button>
              </div>
              <div>
                {props.canChangeType ? <Button icon onClick={() => setValue('isProject', !isProject)}>
                  {isProject ? <Done /> : <Assignment />}
                </Button> : null}
                <Button id="add-item-submit" icon primary type="submit">
                  <Send />
                </Button>
              </div>
            </div>
          </div>
        </Paper>
      </form>
  )}
  </Form>
);

AddItem.propTypes = {
  onAddItem: React.PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
  initialIsProject: React.PropTypes.bool,
  canChangeType: React.PropTypes.bool,
};

export default AddItem;
