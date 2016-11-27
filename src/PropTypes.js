import React from 'react';

const OakPropTypes = {
  item: React.PropTypes.shape({
    isProject: React.PropTypes.bool,
    name: React.PropTypes.string.isRequired,
    isSequential: React.PropTypes.bool,
    createdAt: React.PropTypes.number,
    modifiedAt: React.PropTypes.number,
    children: React.PropTypes.arr,
    dueDate: React.PropTypes.number,
    contexts: React.PropTypes.arr,
    isCompleted: React.PropTypes.bool,
  }),
};

export default OakPropTypes;
