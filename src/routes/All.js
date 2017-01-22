import React from 'react';
import { connect } from 'react-redux';
import mapDispatchToProps from '../utils/mapDispatchToProps';
import ItemList from '../components/ItemList';
import PropTypes from '../PropTypes';

export const All = props => (<ItemList
  onItemAvatarTap={(i) => {
    if (!props.projectChildren[i].isProject) {
      props.completeTask(props.projectChildren[i]._id, !props.projectChildren[i].isCompleted);
    }
  }}
  onItemUpdate={i => props.showUpdateItemDialog(props.projectChildren[i]._id)}
  items={props.projectChildren}
  onItemTap={(i) => {
    if (props.projectChildren[i].isProject) {
      props.router.push(`/project/${props.projectChildren[i]._id}`);
    }
  }}
/>);

All.propTypes = {
  projectChildren: React.PropTypes.arrayOf(PropTypes.item),
  router: React.PropTypes.shape({
    push: React.PropTypes.func,
  }),
};

export function mapStateToProps(state) {
  return { projectChildren: state.items.filter(({ _id }) => _id !== 'inbox' && _id !== 'root') };
}

export default connect(mapStateToProps, mapDispatchToProps)(All);
