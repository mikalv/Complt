import React from 'react';
import { connect } from 'react-redux';
import mapDispatchToProps from '../utils/mapDispatchToProps';
import ItemList from './ItemList';
import AddItem from './AddItem';
import PropTypes from '../PropTypes';

export const Projects = props => (
  <div>
    <ItemList
      onDelete={(i) => {
        const item = props.projectChildren[i];
        if (item.isProject) props.deleteProject(props.projectId, item._id);
        else props.deleteTask(props.projectId, item._id);
      }}
      canDeleteTask
      canDeleteProject
      onItemUpdate={i => props.showUpdateItemDialog(props.projectChildren[i]._id)}
      onItemAvatarTap={(i) => {
        if (!props.projectChildren[i].isProject) {
          props.completeTask(props.projectChildren[i]._id, !props.projectChildren[i].isCompleted);
        }
      }}
      items={props.projectChildren}
      onItemTap={(i) => {
        if (props.projectChildren[i].isProject) {
          props.routerPush(`/project/${props.projectChildren[i]._id}`);
        }
      }}
      style={{ marginBottom: '116px', height: '100%' }}
    />
    <div className="AddItem-fixed">
      <AddItem
        initialIsProject={props.initialIsProject}
        canChangeType={props.canChangeType}
        onAddItem={(item) => {
          if (item.isProject) props.createProject(props.projectId, item);
          else props.createTask(props.projectId, item);
        }}
      />
    </div>
  </div>
);
Projects.propTypes = {
  projectChildren: React.PropTypes.arrayOf(PropTypes.item),
  createProject: React.PropTypes.func,
  createTask: React.PropTypes.func,
  projectId: React.PropTypes.string,
  routerPush: React.PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  initialIsProject: React.PropTypes.bool,
  canChangeType: React.PropTypes.bool,
};

function mapStateToProps(state, ownProps) {
  const project = state.items.find(item => item._id === ownProps.projectId);
  if (project === undefined) return { project: [] };
  const projectChildren = project.children.map(id =>
    state.items.find(item => item._id === id));
  return { projectChildren };
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
