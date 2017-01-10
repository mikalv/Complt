import React from 'react';

const OakPropTypes = {
  item: React.PropTypes.shape({
    isProject: React.PropTypes.bool.isRequired,
    name: React.PropTypes.string.isRequired,
    isSequential: React.PropTypes.bool,
    createdAt: React.PropTypes.number,
    modifiedAt: React.PropTypes.number,
    children: React.PropTypes.arr,
    dueDate: React.PropTypes.number,
    tags: React.PropTypes.arrayOf(React.PropTypes.string),
    isCompleted: React.PropTypes.bool,
  }),
};

export default OakPropTypes;
