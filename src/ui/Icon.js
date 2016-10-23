import React from 'react';

const Icon = ({ icon }) => (
  <i className="material-icons">{icon}</i>
);

Icon.propTypes = {
  icon: React.PropTypes.string.isRequired,
};

export default Icon;
