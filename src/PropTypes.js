import React from 'react';

const OakPropTypes = {
  item: React.PropTypes.shape({
    isProject: React.PropTypes.bool.isRequired,
    name: React.PropTypes.string.isRequired,
    description: React.PropTypes.string,
    isSequential: React.PropTypes.bool,
    createdAt: React.PropTypes.string,
    modifiedAt: React.PropTypes.string,
    children: React.PropTypes.arr,
    dueDate: React.PropTypes.string,
    contexts: React.PropTypes.arr,
    isCompleted: React.PropTypes.bool,
  }),
};

export default OakPropTypes;
