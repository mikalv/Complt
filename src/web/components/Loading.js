import { h } from 'preact';
import Spinner from './Spinner';
import './Loading.css';

const Loading = ({ size }) =>
  <div className="Loading">
    <Spinner id="items-loading" size={size} />
  </div>;

export default Loading;
