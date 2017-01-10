import React from 'react';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';
import AddItem from './AddItem';
import ItemList from './ItemList';
import OakPropTypes from '../PropTypes';

export const Inbox = props => (
  <div>
    {props.data ? <div className="flex center row">
      <div className="loading-padding">
        <CircularProgress scale={2} />
      </div>
    </div> : <div>
      <ItemList
        items={props.data.inbox || []}
        onItemAvatarTap={index =>
          props.completeTask(props.data.inbox[index].id, !props.data.inbox[index].isCompleted)}
        style={{ marginBottom: '116px', height: '100%' }}
        canDeleteTask
        onDelete={index => props.deleteTask(props.data.inbox[index].id)}
      />
      <div className="AddItem-fixed">
        <AddItem initialType="Task" onAddItem={props.createTask} />
      </div>
    </div>}
  </div>
);
Inbox.propTypes = {
  data: React.PropTypes.shape({
    inbox: React.PropTypes.arrayOf(OakPropTypes.item),
    loading: React.PropTypes.bool,
  }),
  createTask: React.PropTypes.func,
  completeTask: React.PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  deleteTask: React.PropTypes.func,
};

export default Inbox;
