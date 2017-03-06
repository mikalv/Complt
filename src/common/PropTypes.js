import React from 'react';

const CompltPropTypes = {
  item: React.PropTypes.shape({
    _id: React.PropTypes.string,
    isProject: React.PropTypes.bool,
    name: React.PropTypes.string,
    isSequential: React.PropTypes.bool,
    createdAt: React.PropTypes.number,
    modifiedAt: React.PropTypes.number,
    children: React.PropTypes.arr,
    dueDate: React.PropTypes.number,
    tags: React.PropTypes.arrayOf(React.PropTypes.string),
    isCompleted: React.PropTypes.bool,
  }),
};

export default CompltPropTypes;
