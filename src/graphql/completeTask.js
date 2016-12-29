import { graphql } from 'react-apollo';
import completeTaskMutation from './completeTask.gql';

export default graphql(completeTaskMutation, {
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
});
