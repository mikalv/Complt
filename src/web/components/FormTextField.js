import React from 'react';
import TextField from 'react-md/lib/TextFields/TextField';
import FormInput from 'react-form/lib/formInput';

const FormTextField = ({ field, ...rest }) => (
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


export default FormTextField;
