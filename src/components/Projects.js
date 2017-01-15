import React from 'react';
import ItemList from './ItemList';
import AddItem from './AddItem';
import OakPropTypes from '../PropTypes';

const Projects = props => (
  <div>
    <ItemList
      onDelete={i => props.onDelete(i)}
      canDeleteTask
      canDeleteProject
      onItemAvatarTap={props.onAvatarTap}
      items={props.projectChildren}
      onItemTap={i => props.onItemTap(i)}
      style={{ marginBottom: '116px', height: '100%' }}
    />
    <div className="AddItem-fixed">
      <AddItem
        initialIsProject
        canChangeType
        onAddItem={(item) => {
          if (item.isProject) props.onCreateProject(item);
          else props.onCreateTask(item);
        }}
      />
    </div>
  </div>
);
Projects.propTypes = {
  projectChildren: React.PropTypes.arrayOf(OakPropTypes.item),
  onCreateProject: React.PropTypes.func,
  onCreateTask: React.PropTypes.func,
  onAvatarTap: React.PropTypes.func,
  onDelete: React.PropTypes.func, // eslint-disable-line react/no-unused-prop-types
};

export default Projects;
