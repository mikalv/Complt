import React from 'react';
import Textfield from 'preact-material-components/Textfield';
import FormInput from 'react-form/lib/formInput';

const FormTextField = ({ field, ...rest }) => (
  <FormInput field={field}>
    {({ setValue, getValue, setTouched }) => (
      <Textfield
        {...rest}
        value={getValue()}
        onChange={({ target: { value = '' } }) => setValue(value)}
        onBlur={() => setTouched()}
      />)}
  </FormInput>
);


export default FormTextField;
