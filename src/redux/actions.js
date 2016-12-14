import {
  TOGGLE_DRAWER,
  DOCK_DRAWER,
  LOGIN,
  LOGOUT,
} from './actionTypes';

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
