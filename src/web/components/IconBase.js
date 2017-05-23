import { h } from 'preact';
import noUpdate from '../noUpdate';

const IconBase = ({ children, size, ...props }) => {
  const computedSize = size || '1em';
  return (
    <svg
      fill="currentColor"
      preserveAspectRatio="xMidYMid meet"
      height={computedSize}
      width={computedSize}
      {...props}
    >
      {children}
    </svg>
  );
};

export default noUpdate(IconBase);
