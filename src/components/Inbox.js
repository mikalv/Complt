import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import CircularProgress from 'material-ui/CircularProgress';
import AddTask from './AddTask';
import ItemList from './ItemList';
import OakPropTypes from '../PropTypes';
import './Inbox.css';


const Inbox = props => (
  <div>
    {props.data.loading ? <div className="flex center row">
      <CircularProgress className="Inbox-loading" />
    </div> : <div>
      <ItemList
        items={props.data.inbox || []}
        onItemAvatarTap={index =>
          props.completeTask(props.data.inbox[index].id, !props.data.inbox[index].isCompleted)}
        style={{ marginBottom: '116px', height: '100%' }}
      />
      <div className="Inbox-AddTask">
        <AddTask onAddTask={props.createTask} />
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
  completeTask: React.PropTypes.func,
};

const inboxItemsQuery = gql`
query Inbox{
  inbox {
    id
    name
    isCompleted
    contexts
  }
}
`;

const addTaskMutation = gql`
mutation addTask($input: TaskInput) {
  createTaskInInbox(input: $input) {
    id
    name
    isCompleted
    contexts
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
              input: {
                name: task.name,
                isCompleted: task.isCompleted || false,
                contexts: task.contexts || [],
              },
            },
            optimisticResponse: {
              __typename: 'Mutation',
              createTaskInInbox: {
                id: task.name + new Date().toString(),
                name: task.name,
                isCompleted: task.isCompleted || false,
                contexts: task.contexts || [],
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
                    mutationResult.data.createTaskInInbox,
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
