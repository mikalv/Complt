import { h } from 'preact';

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

export default IconBase;
