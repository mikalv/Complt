import {
  ADD_TASK,
  COMPLETE_TASK,
  TOGGLE_DRAWER,
  DOCK_DRAWER,
  LOGIN,
  LOGOUT,
  GET_PROFILE,
} from './actionTypes';

export function addTask(task) {
  return {
    type: ADD_TASK,
    task,
  };
}
export function completeTask(index, isCompleted) {
  return {
    type: COMPLETE_TASK,
    index,
    isCompleted,
  };
}

export function toggleDrawer() {
  return {
    type: TOGGLE_DRAWER,
  };
}

export function dockDrawer(shouldDock) {
  return {
    type: DOCK_DRAWER,
    shouldDock,
  };
}

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

export function getProfile(profile) {
  return {
    type: GET_PROFILE,
    profile,
  };
}
