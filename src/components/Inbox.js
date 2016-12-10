import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import CircularProgress from 'material-ui/CircularProgress';
import AddItem from './AddItem';
import ItemList from './ItemList';
import OakPropTypes from '../PropTypes';

const Inbox = props => (
  <div>
    {props.data.loading ? <div className="flex center row">
      <CircularProgress className="loading-padding" />
    </div> : <div>
      <ItemList
        items={props.data.inbox || []}
        onItemAvatarTap={index =>
          props.completeTask(props.data.inbox[index].id, !props.data.inbox[index].isCompleted)}
        style={{ marginBottom: '116px', height: '100%' }}
        canDelete
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

const inboxItemsQuery = gql`
query Inbox{
  inbox {
    id
    name
    isCompleted
    tags
  }
}
`;

const addTaskMutation = gql`
mutation addTask($task: TaskInput!, $projectId: ID!) {
  createTask(task: $task, projectId: $projectId) {
    id
    name
    isCompleted
    tags
  }
}
`;

const CompleteTaskMutation = gql`
mutation completeTask($input: TaskUpdateInput) {
  taskUpdate(input: $input) {
    id
    isCompleted
  }
}
`;

const deleteTaskMutation = gql`
mutation deleteTask($parentProjectId: ID!, $taskId: ID!) {
  deleteTask(parentProjectId: $parentProjectId, taskId: $taskId) {
    id
  }
}
`;

export default compose(
  graphql(inboxItemsQuery),
  graphql(CompleteTaskMutation, {
    props({ mutate }) {
      return {
        completeTask(id, isCompleted) {
          mutate({
            variables: {
              input: {
                id,
                isCompleted,
              },
            },
            optimisticResponse: {
              __typename: 'Mutation',
              taskUpdate: {
                id,
                isCompleted,
                __typename: 'Task',
              },
            },
          });
        },
      };
    },
  }),
  graphql(addTaskMutation, {
    props({ mutate }) {
      return {
        createTask(task) {
          mutate({
            variables: {
              task: {
                name: task.name,
                isCompleted: task.isCompleted || false,
                tags: task.tags || [],
              },
              projectId: 'inbox',
            },
            optimisticResponse: {
              __typename: 'Mutation',
              createTask: {
                id: task.name + new Date().toString(),
                name: task.name,
                isCompleted: task.isCompleted || false,
                tags: task.tags || [],
                isOptimistic: true,
                __typename: 'Task',
              },
            },
            updateQueries: {
              Inbox(prev, { mutationResult }) {
                return {
                  ...prev,
                  inbox: [
                    ...prev.inbox,
                    mutationResult.data.createTask,
                  ],
                };
              },
            },
          });
        },
      };
    },
  }),
  graphql(deleteTaskMutation, {
    props({ mutate }) {
      return {
        deleteTask(taskId) {
          mutate({
            variables: {
              parentProjectId: 'inbox',
              taskId,
            },
            optimisticResponse: {
              __typename: 'Mutation',
              taskUpdate: {
                id: taskId,
                __typename: 'Task',
              },
            },
            updateQueries: {
              Inbox(prev) {
                const taskIndex = prev.inbox.findIndex(item => item.id === taskId);
                return {
                  ...prev,
                  inbox: [
                    ...prev.inbox.slice(0, taskIndex),
                    ...prev.inbox.slice(taskIndex + 1),
                  ],
                };
              },
            },
          });
        },
      };
    },
  })
  )(Inbox);
