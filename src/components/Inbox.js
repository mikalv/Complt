import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import AddTask from './AddTask';
import ItemList from './ItemList';
import OakPropTypes from '../PropTypes';
import './Inbox.css';

const Inbox = ({ inbox, addTask, completeTask }) => (
  <div>
    <ItemList items={inbox} onItemAvatarTap={completeTask} style={{ marginBottom: '116px', height: '100%' }} />
    <div className="Inbox-AddTask">
      <AddTask onAddTask={addTask} />
    </div>
  </div>
);

Inbox.propTypes = {
  inbox: React.PropTypes.arrayOf(OakPropTypes.item),
  addTask: React.PropTypes.func,
  completeTask: React.PropTypes.func,
};

function mapStateToProps(state) {
  return {
    inbox: state.projects,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);
