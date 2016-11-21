import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLList,
} from 'graphql';
import Item from './types/Item';
import Task from './types/Task';
import TaskInput from './inputs/TaskInput';
import TaskUpdateInput from './inputs/TaskUpdateInput';
import getItemsByUserAndIds from '../lib/getItemsByUserAndIds';
import { verifyInboxExists, addItemToInbox } from '../lib/inbox';
import updateTask from '../lib/updateTask';

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      itemById: {
        type: Item,
        args: {
          id: { type: new GraphQLNonNull(GraphQLID) },
        },
        resolve(rootValue, { id }) {
          if (id !== 'inbox' && id !== 'root') {
            return getItemsByUserAndIds(rootValue.userId, [id]).then(items => items[0]);
          }
          return new Error(`Please do not request the ${id} project from this field`);
        },
      },
      inbox: {
        name: 'Inbox',
        type: new GraphQLList(Task),
        resolve(rootValue) {
          return verifyInboxExists(rootValue.userId)
            .then(inbox => getItemsByUserAndIds(rootValue.userId, inbox.children));
        },
      },
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      createTaskInInbox: {
        args: {
          input: { type: TaskInput },
        },
        type: Task,
        resolve({ userId }, { input }) {
          return addItemToInbox({
            ...input,
            owner: userId,
            isProject: false,
          }).then(task => task);
        },
      },
      taskUpdate: {
        args: {
          input: { type: TaskUpdateInput },
        },
        type: Task,
        resolve({ userId }, { input }) {
          return updateTask(userId, input);
        },
      },
    },
  }),
});

export default schema;
