import uuid from 'uuid';
import history from '../../web/history';
import pouchDBSync from '../utils/pouchDBSync';
import isTokenExpired from '../utils/auth';
import logException from '../utils/logException';
import processItem from '../utils/processItem';
import renewAuth from '../../web/renewAuth';
import {
  LOGIN,
  LOGOUT,
  GET_PROFILE,
  DELETE_ITEM_POUCH,
  INSERT_ITEM_POUCH,
  UPDATE_ITEM_POUCH,
  CREATE_ITEM,
  COMPLETE_ITEM,
  DELETE_TASK,
  DELETE_PROJECT,
  SHOW_TOAST,
  DISMISS_TOAST,
  SYNC_STARTED,
  SYNC_SUCCEDED,
  SYNC_FAILED,
  UPDATE_ITEM,
  SHOW_UPDATE_ITEM_DIALOG,
  HIDE_UPDATE_ITEM_DIALOG,
  SHOW_MOVE_ITEM_DIALOG,
  HIDE_MOVE_ITEM_DIALOG,
  MOVE_ITEM,
  CHANGE_ITEMS_TO_SHOW,
} from './actionTypes';

export const login = token => ({ type: LOGIN, token });

export const logout = () => ({ type: LOGOUT });

export const getProfile = profile => ({ type: GET_PROFILE, profile });

export const removeItemPouch = doc => ({ type: DELETE_ITEM_POUCH, id: doc._id });

export const insertItemPouch = doc => ({ type: INSERT_ITEM_POUCH, item: doc });

export const updateItemPouch = doc => ({ type: UPDATE_ITEM_POUCH, item: doc });

export const createTask = (parentProjectId, item) => ({
  type: CREATE_ITEM,
  parentProjectId,
  item: { _id: uuid.v4(), isProject: false, ...item },
});

export const createProject = (parentProjectId, item) => ({
  type: CREATE_ITEM,
  parentProjectId,
  item: { _id: uuid.v4(), isProject: true, ...item },
});

export const completeItem = (id, isCompleted) => ({ type: COMPLETE_ITEM, id, isCompleted });

export const deleteTask = (parentProjectId, id) => ({
  type: DELETE_TASK,
  parentProjectId,
  id,
});

export const deleteProject = (parentProjectId, id) => ({
  type: DELETE_PROJECT,
  parentProjectId,
  id,
});

export const showToast = toast => ({
  type: SHOW_TOAST,
  toast,
});

export const dismissToast = () => ({
  type: DISMISS_TOAST,
});

export const showSignInToast = () => (dispatch) => {
  dispatch(showToast({
    text: 'Please sign in to sync',
    action: {
      label: 'SIGN IN',
      onClick: () => history.push('/login'),
    } }));
};

export const syncStarted = () => ({
  type: SYNC_STARTED,
});
export const syncFailed = () => ({
  type: SYNC_FAILED,
});
export const syncSucceded = () => ({
  type: SYNC_SUCCEDED,
});

export const attemptSync = () => (dispatch, getState) => {
  dispatch(syncStarted());
  dispatch(showToast({ text: 'Syncing Started, Please Wait...' }));
  if (isTokenExpired(getState().auth)) {
    return renewAuth().then((idToken) => {
      dispatch(login(idToken));
      return sync(dispatch, getState)();
    }).catch(() => {
      dispatch(showSignInToast());
      dispatch(syncFailed());
    });
  }
  return sync(dispatch, getState)();
};

export const sync = (dispatch, getState) => () =>
  pouchDBSync(getState().auth, process.env.REACT_APP_COUCH_URL)
  .then(() => {
    dispatch(showToast({ text: 'Syncing finished' }));
    dispatch(syncSucceded());
  })
  .catch((error) => {
    if (error.status === 401) {
      dispatch(showSignInToast());
    } else {
      logException(new Error('An error occured while syncing'), error);
      dispatch(showToast({ text: 'An error occured while syncing, please try again later' }));
    }
    dispatch(syncFailed());
  });

export const updateItem = item => ({
  type: UPDATE_ITEM,
  item,
});

export const showUpdateItemDialog = id => ({
  type: SHOW_UPDATE_ITEM_DIALOG,
  id,
});

export const hideUpdateItemDialog = () => ({
  type: HIDE_UPDATE_ITEM_DIALOG,
});

export const handleUpdateItem = (updatedItemInput, item) => (dispatch) => {
  const processedItem = processItem(updatedItemInput, item.isProject);
  let newItem;
  if (item.isProject) {
    newItem = {
      ...item,
      name: processedItem.name,
    };
  } else {
    newItem = {
      ...item,
      name: processedItem.name,
      tags: processedItem.tags,
    };
  }
  dispatch(updateItem(newItem));
  dispatch(hideUpdateItemDialog());
};

export const showMoveItemDialog = (id, parentProject) => ({
  type: SHOW_MOVE_ITEM_DIALOG,
  id,
  parentProject,
});

export const hideMoveItemDialog = () => ({
  type: HIDE_MOVE_ITEM_DIALOG,
});

export const moveItem = (id, previousParent, newParent) => ({
  type: MOVE_ITEM, id, previousParent, newParent,
});

export const handleMoveItem = (id, previousParent, newParent) => (dispatch) => {
  dispatch(hideMoveItemDialog());
  dispatch(moveItem(id, previousParent, newParent));
};

export const changeItemsToShow = option => ({ type: CHANGE_ITEMS_TO_SHOW, option });
