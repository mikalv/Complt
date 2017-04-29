import { h } from 'preact';
import cn from 'classnames';
import pure from '../pure';
import './Chip.scss';

const Chip = ({ children, className, Component = 'span', ...props }) => (
  <Component className={cn(className, 'chip')} {...props}>{children}</Component>
);

export default pure(Chip);
