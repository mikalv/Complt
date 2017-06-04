import { h } from 'preact';
import cn from 'classnames';

export default Comp => (...styles) => {
  const classes = [];
  const funcClasses = [];
  styles.forEach(style => {
    if (typeof style === 'function') funcClasses.push(style);
    else classes.push(style);
  });
  return props => {
    const comp = (
      <Comp
        {...props}
        className={cn(
          props.className,
          classes.join(' '),
          funcClasses.map(func => func(props)).join(' ')
        )}
      />
    );
    delete props.glam; // eslint-disable-line no-param-reassign
    return comp;
  };
};
