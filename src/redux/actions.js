import uuid from 'uuid';
import {
  LOGIN,
  LOGOUT,
  CREATE_ITEM,
  COMPLETE_TASK,
  DELETE_TASK,
  DELETE_PROJECT,
} from './actionTypes';

export function login(token) {
  return {
    type: LOGIN,
    token,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function createTask(parentProjectId, item) {
  return {
    type: CREATE_ITEM,
    parentProjectId,
    item: {
      _id: uuid.v4(),
      isProject: false,
      ...item,
    },
  };
}

export function createProject(parentProjectId, item) {
  return {
    type: CREATE_ITEM,
    parentProjectId,
    item: {
      _id: uuid.v4(),
      isProject: true,
      ...item,
    },
  };
}

export function completeTask(id, isCompleted) {
  return {
    type: COMPLETE_TASK,
    id,
    isCompleted,
  };
}

export function deleteTask(parentProjectId, id) {
  return {
    type: DELETE_TASK,
    parentProjectId,
    id,
  };
}

export function deleteProject(parentProjectId, id) {
  return {
    type: DELETE_PROJECT,
    parentProjectId,
    id,
  };
}
