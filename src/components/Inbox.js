import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AddItem from './AddItem';
import ItemList from './ItemList';
import OakPropTypes from '../PropTypes';
import * as actions from '../redux/actions';

export const Inbox = props => (
  <div>
    <ItemList
      items={props.inbox}
      onItemAvatarTap={index =>
        props.completeTask(props.inbox[index]._id, !props.inbox[index].isCompleted)}
      style={{ marginBottom: '116px', height: '100%' }}
      canDeleteTask
      onDelete={index => props.deleteTask(props.inbox[index].id)}
    />
    <div className="AddItem-fixed">
      <AddItem initialIsProject={false} onAddItem={item => props.createTask('inbox', item)} />
    </div>
  </div>
);
Inbox.propTypes = {
  createTask: React.PropTypes.func,
  completeTask: React.PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  deleteTask: React.PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  inbox: React.PropTypes.arrayOf(OakPropTypes.item),
};

function mapStateToProps(state) {
  const inbox = state.items.find(item => item._id === 'inbox');
  if (inbox === undefined) return {};
  const inboxChildren = inbox.children.map(id => state.items.find(item => item._id === id));
  return { inbox: inboxChildren };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);
