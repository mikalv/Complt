import uuid from 'uuid';
import { push } from 'react-router-redux';
import PouchDB from 'pouchdb/lib/index-browser';
import db from '../db';
import isTokenExpired from '../utils/auth';
import logException from '../utils/logException';
import {
  LOGIN,
  LOGOUT,
  GET_PROFILE,
  CREATE_ITEM,
  COMPLETE_TASK,
  DELETE_TASK,
  DELETE_PROJECT,
  SHOW_TOAST,
  DISMISS_TOAST,
  SYNC_STARTED,
  SYNC_SUCCEDED,
  SYNC_FAILED,
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

export function getProfile(profile) {
  return {
    type: GET_PROFILE,
    profile,
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

export function showToast(toast) {
  return {
    type: SHOW_TOAST,
    toast,
  };
}

export function dismissToast() {
  return {
    type: DISMISS_TOAST,
  };
}

export function showSignInToast() {
  return (dispatch) => {
    dispatch(showToast({
      text: 'Please sign in to sync',
      action: {
        label: 'SIGN IN',
        onClick: () => dispatch(push('/login')),
      } }));
  };
}

export function syncStarted() {
  return {
    type: SYNC_STARTED,
  };
}
export function syncFailed() {
  return {
    type: SYNC_FAILED,
  };
}
export function syncSucceded() {
  return {
    type: SYNC_SUCCEDED,
  };
}

export function sync() {
  return (dispatch, getState) => {
    if (isTokenExpired(getState().auth)) {
      dispatch(showSignInToast());
      dispatch(syncFailed());
    } else {
      dispatch(syncStarted());
      dispatch(showToast({ text: 'Syncing Started, Please Wait...' }));
      const remoteDB = new PouchDB('https://oak-envoy.herokuapp.com/envoy', {
        ajax: { headers: { Authorization: `Bearer ${getState().auth}` } },
      });
      PouchDB.sync(db, remoteDB).on('error', (error) => {
        if (error.status === 401) {
          dispatch(showSignInToast());
        } else {
          logException(new Error('An error occured while syncing'), error);
          dispatch(showToast({ text: 'An error occured while syncing, please try again later' }));
        }
        dispatch(syncFailed());
      }).on('complete', () => {
        dispatch(showToast({ text: 'Syncing finished' }));
        dispatch(syncSucceded());
      });
    }
  };
}
