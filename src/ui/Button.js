import React from 'react';
import './Button.css';

const Button = ({ onClick, children }) => (
  <button className="btn" onClick={onClick}>{children}</button>
);

Button.propTypes = {
  onClick: React.PropTypes.func,
  children: React.PropTypes.node,
};

export default Button;
