import React from 'react';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';
import './Loading.css';

const Loading = ({ scale }) => (
  <div className="Loading">
    <CircularProgress id="items-loading" scale={scale || 3} />
  </div>
);

Loading.propTypes = {
  scale: React.PropTypes.number,
};

export default Loading;
