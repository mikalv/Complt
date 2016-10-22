import React from 'react';
import './Button.css';
const Button = ({onClick, children}) => (
  <button className='btn' onClick={onClick}>{children}</button>
)


export default Button;
