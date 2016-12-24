import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import ItemList from './ItemList';
import AddItem from './AddItem';
import OakPropTypes from '../PropTypes';

const Projects = props => (
  <div>
    {props.loading ? <div className="flex center row">
      <CircularProgress className="loading-padding" />
    </div> : <div>
      <ItemList
        onItemAvatarTap={props.onAvatarTap}
        items={props.projectChildren || []}
        onItemTap={i => props.onItemTap(i)}
        style={{ marginBottom: '116px', height: '100%' }}
      />
    </div>}
    <div className="AddItem-fixed">
      <AddItem
        initialType="Project"
        canChangeType
        onAddItem={(item) => {
          if (item.__typename === 'Project') props.onCreateProject(item.name);
          else props.onCreateTask(item);
        }}
      />
    </div>
  </div>
);
Projects.propTypes = {
  projectChildren: React.PropTypes.arrayOf(OakPropTypes.item),
  loading: React.PropTypes.bool,
  onCreateProject: React.PropTypes.func,
  onCreateTask: React.PropTypes.func,
  onAvatarTap: React.PropTypes.func,
};

export default Projects;
