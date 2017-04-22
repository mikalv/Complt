/** @jsx h */
import { h } from 'preact';
import cn from 'classnames';
import './IconButton.scss';

const IconButton = ({ children, className, ...props }) =>
  <button tabIndex="0" role="button" {...props} className={cn('mdc-icon-toggle IconButton', className)}>{children}</button>;


export default IconButton;
