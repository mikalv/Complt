import { h } from 'preact';
import './Spinner.scss';

// Credit for this component goes to http://codepen.io/mrrocks/pen/EiplA

const Spinner = ({ size = 65, ...props }) => (
  <svg
    className="spinner"
    {...props}
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 66 66"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      className="spinner-path"
      fill="none"
      strokeWidth="6"
      strokeLinecap="round"
      cx="33"
      cy="33"
      r="30"
    />
  </svg>
);

export default Spinner;
