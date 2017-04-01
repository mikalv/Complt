import uuid from 'uuid/v4';
import history from '../../web/history';
import pouchDBSync from '../utils/pouchDBSync';
import isTokenExpired from '../utils/auth';
import logException from '../utils/logException';
import processItem from '../utils/processItem';
import renewAuth from '../../web/renewAuth';
import getTokenInfo from '../utils/getTokenInfo';
import loginWithGoogle from '../../web/loginWithGoogle';
import {
  LOGIN,
  LOGOUT,
  GET_PROFILE,
  DELETE_ITEM_POUCH,
  INSERT_ITEM_POUCH,
  UPDATE_ITEM_POUCH,
  CREATE_ITEM,
  COMPLETE_ITEM,
  DELETE_ITEM,
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
  DELETE_ITEM_WITHOUT_PARENT,
  MOVE_ITEM_WITHOUT_PARENT,
  INITIAL_ITEMS_LOADED,
} from './actionTypes';

export const login = token => ({ type: LOGIN, token });

export const loginCallback = (error, result) => (dispatch) => {
  if (error) {
    logException(error);
    return;
  }
  if (!result) return;
  dispatch(login(result.idToken));
  getTokenInfo(result.idToken).then(profile => dispatch(getProfile(profile)));
  history.push('/');
};

export const logout = () => ({ type: LOGOUT });

export const getProfile = profile => ({ type: GET_PROFILE, profile });

export const removeItemPouch = doc => ({ type: DELETE_ITEM_POUCH, id: doc._id });

export const insertItemPouch = doc => ({ type: INSERT_ITEM_POUCH, item: doc });

export const updateItemPouch = doc => ({ type: UPDATE_ITEM_POUCH, item: doc });

export const createTask = (parentProjectId, item) => ({
  type: CREATE_ITEM,
  parentProjectId,
  item: { _id: uuid(), isProject: false, ...item },
});

export const createProject = (parentProjectId, item) => ({
  type: CREATE_ITEM,
  parentProjectId,
  item: { _id: uuid(), isProject: true, ...item },
});

export const completeItem = (id, isCompleted) => ({ type: COMPLETE_ITEM, id, isCompleted });

export const deleteItem = (parentProjectId, id) => ({
  type: DELETE_ITEM,
  parentProjectId,
  id,
});

export const deleteItemWithoutParent = id => ({
  type: DELETE_ITEM_WITHOUT_PARENT,
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
      onClick: () => loginWithGoogle((err, result) => dispatch(loginCallback(err, result))),
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
      getTokenInfo(idToken).then(profile => dispatch(getProfile(profile)));
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
  const newItem = {
    ...item,
    name: processedItem.name,
    tags: processedItem.tags,
    dates: processedItem.dates,
  };
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

export const moveItemWithoutParent = (id, newParent) => ({
  type: MOVE_ITEM_WITHOUT_PARENT, id, newParent,
});

export const handleMoveItem = (id, previousParent, newParent) => (dispatch) => {
  dispatch(hideMoveItemDialog());
  if (typeof previousParent === 'string') dispatch(moveItem(id, previousParent, newParent));
  if (previousParent === null) dispatch(moveItemWithoutParent(id, newParent));
};

export const changeItemsToShow = option => ({ type: CHANGE_ITEMS_TO_SHOW, option });

export const initialItemsLoaded = () => ({ type: INITIAL_ITEMS_LOADED });
