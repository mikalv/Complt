import React from 'react';
import Icon from './Icon';
import './Button.css';

function getButtonClassName(children) {
  if (children.type === Icon) {
    return 'btn btn-icon';
  }
  return 'btn';
}

const Button = ({ onClick, children }) => (
  <button className={getButtonClassName(children)} onClick={onClick}>{children}</button>
);

Button.propTypes = {
  onClick: React.PropTypes.func,
  children: React.PropTypes.node,
};

export default Button;
