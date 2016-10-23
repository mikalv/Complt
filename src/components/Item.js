import React from 'react';
import Button from '../ui/Button';
import Icon from '../ui/Icon';

const Item = ({ name, onItemClickAdd, type }) => (
  <div className={type}>
    <span>{name}</span>
    {type !== 'task' ? <Button onClick={onItemClickAdd}><Icon icon="add" /></Button> : ''}
  </div>
);


Item.propTypes = {
  name: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  onItemClickAdd: React.PropTypes.func,
};

export default Item;
