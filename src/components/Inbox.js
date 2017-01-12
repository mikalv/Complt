import React from 'react';
import AddItem from './AddItem';
import ItemList from './ItemList';
import OakPropTypes from '../PropTypes';
import createItem from '../pouch/createItem';
import pouchDBHOC from '../pouchDBHOC';

export const Inbox = props => (
  <div>
    <ItemList
      items={props.data.children || []}
      onItemAvatarTap={index =>
        props.completeTask(props.data.inbox[index].id, !props.data.inbox[index].isCompleted)}
      style={{ marginBottom: '116px', height: '100%' }}
      canDeleteTask
      onDelete={index => props.deleteTask(props.data.inbox[index].id)}
    />
    <div className="AddItem-fixed">
      <AddItem initialType="Task" onAddItem={item => createItem('inbox', item)} />
    </div>
  </div>
);
Inbox.propTypes = {
  data: React.PropTypes.shape({
    inbox: React.PropTypes.shape({
      children: React.PropTypes.arrayOf(OakPropTypes.item)
    }),
  }),
};

export default pouchDBHOC('inbox', { includeChildren: true })(Inbox);
