import React from 'react';
import Form from 'react-form/lib/form';
import Assignment from 'react-icons/lib/md/assignment';
import Done from 'react-icons/lib/md/done';
import Label from 'react-icons/lib/md/label';
import Send from 'react-icons/lib/md/send';
import Button from 'react-md/lib/Buttons/Button';
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
            placeholder={isProject ? 'e.g. Report' : 'e.g. Finish Report @work !tomorrow at 8am!'}
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
      </form>
  )}
  </Form>
);

export default AddItem;
