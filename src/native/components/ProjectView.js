import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import ItemList from './ItemList';
import AddItem from './AddItem';
import mapDispatchToProps from '../../common/utils/mapDispatchToProps';
import PropTypes from '../../common/PropTypes';

const ProjectView = props => (
  <View style={styles.container}>
    <View style={styles.itemList}><ItemList
      onDeletePress={(i) => {
        const item = props.projectChildren[i];
        if (item.isProject) props.deleteProject(props.projectId, item._id);
        else props.deleteTask(props.projectId, item._id);
      }}
      onAvatarPress={(i) => {
        if (!props.projectChildren[i].isProject) {
          props.completeTask(props.projectChildren[i]._id, !props.projectChildren[i].isCompleted);
        }
      }}
      items={props.projectChildren}
      onItemPress={(i) => {
        if (props.projectChildren[i].isProject) {
          props.routerPush(`/project/${props.projectChildren[i]._id}`);
        }
      }}
    /></View>
    <View style={styles.addItem}><AddItem
      initialIsProject={props.initialIsProject}
      canChangeType={props.canChangeType}
      onAddItem={(item) => {
        if (item.isProject) props.createProject(props.projectId, item);
        else props.createTask(props.projectId, item);
      }}
    /></View>
  </View>
);

ProjectView.propTypes = {
  projectChildren: React.PropTypes.arrayOf(PropTypes.item),
  createProject: React.PropTypes.func,
  createTask: React.PropTypes.func,
  projectId: React.PropTypes.string,
  routerPush: React.PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  initialIsProject: React.PropTypes.bool,
  canChangeType: React.PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemList: {
    flex: 3,
  },
  addItem: {
    flex: 1,
  },
});

export function mapStateToProps(state, ownProps) {
  const project = state.items.find(item => item._id === ownProps.projectId);
  if (project === undefined) return { projectChildren: [] };
  const projectChildren = project.children.map(id =>
    state.items.find(item => item._id === id));
  return { projectChildren };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectView);
