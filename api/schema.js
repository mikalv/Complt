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
import getItemsByUserAndIds from './lib/getItemsByUserAndIds';
import addItemToProject from './lib/addItemToProject';
import verifyItemExists from './lib/verifyItemExists';
import updateTask from './lib/updateTask';
import deleteTask from './lib/deleteTask';

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
          return verifyItemExists(rootValue.userId, 'inbox')
            .then(inbox => getItemsByUserAndIds(rootValue.userId, inbox.children));
        },
      },
      root: {
        name: 'Root',
        type: new GraphQLList(Item),
        resolve(rootValue) {
          return verifyItemExists(rootValue.userId, 'root')
            .then(rootProject => getItemsByUserAndIds(rootValue.userId, rootProject.children));
        },
      },
      user: {
        name: 'User',
        type: User,
        resolve: ({ user }) => user,
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
        resolve({ userId }, { input }) {
          return updateTask(userId, input);
        },
      },
      deleteTask: {
        args: {
          parentProjectId: { type: new GraphQLNonNull(GraphQLID) },
          taskId: { type: new GraphQLNonNull(GraphQLID) },
        },
        type: Task,
        resolve({ userId }, { parentProjectId, taskId }) {
          return deleteTask(userId, taskId, parentProjectId);
        },
      },
      createProject: {
        args: {
          projectId: { type: new GraphQLNonNull(GraphQLID) },
          project: { type: new GraphQLNonNull(ProjectInput) },
        },
        type: Project,
        resolve({ userId }, { project, projectId }) {
          const projectToCreate = {
            name: project.name,
            projectType: project.isSequential ? 'seq' : 'para',
            owner: userId,
            isProject: true,
          };
          if (projectId === 'inbox') {
            return new Error('Projects cannot be added to the inbox');
          }
          return addItemToProject(projectToCreate, projectId)
          .then(projectCreated => projectCreated);
        },
      },
      createTask: {
        args: {
          projectId: { type: new GraphQLNonNull(GraphQLID) },
          task: { type: new GraphQLNonNull(TaskInput) },
        },
        type: Task,
        resolve({ userId }, { task, projectId }) {
          const taskToCreate = {
            name: task.name,
            isCompleted: task.isCompleted,
            tags: task.tags,
            owner: userId,
            isProject: false,
          };
          return addItemToProject(taskToCreate, projectId).then(taskCreated => taskCreated);
        },
      },
    },
  }),
});

export default schema;
