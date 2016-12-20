import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLList,
} from 'graphql';
import Item from './types/Item';
import Task from './types/Task';
import Project from './types/Project';
import User from './types/User';
import TaskInput from './inputs/TaskInput';
import TaskUpdateInput from './inputs/TaskUpdateInput';
import ProjectInput from './inputs/ProjectInput';
import * as resolvers from './resolvers';

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      itemById: {
        type: Item,
        args: {
          id: { type: new GraphQLNonNull(GraphQLID) },
        },
        resolve: resolvers.queryItemByIdResolver,
      },
      inbox: {
        name: 'Inbox',
        type: new GraphQLList(Task),
        resolve: resolvers.queryInboxResolver,
      },
      root: {
        name: 'Root',
        type: new GraphQLList(Item),
        resolve: resolvers.queryRootResolver,
      },
      user: {
        name: 'User',
        type: User,
        resolve: resolvers.queryUserResolver,
      },
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      taskUpdate: {
        args: {
          input: { type: TaskUpdateInput },
        },
        type: Task,
        resolve: resolvers.mutationTaskUpdateResolver,
      },
      deleteTask: {
        args: {
          parentProjectId: { type: new GraphQLNonNull(GraphQLID) },
          taskId: { type: new GraphQLNonNull(GraphQLID) },
        },
        type: Task,
        resolve: resolvers.mutationDeleteTaskResolver,
      },
      createProject: {
        args: {
          projectId: { type: new GraphQLNonNull(GraphQLID) },
          project: { type: new GraphQLNonNull(ProjectInput) },
        },
        type: Project,
        resolve: resolvers.mutationCreateProjectResolver,
      },
      createTask: {
        args: {
          projectId: { type: new GraphQLNonNull(GraphQLID) },
          task: { type: new GraphQLNonNull(TaskInput) },
        },
        type: Task,
        resolve: resolvers.mutationCreateTaskResolver,
      },
    },
  }),
});

export default schema;
