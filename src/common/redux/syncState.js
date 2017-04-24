import {
  SYNC_STARTED,
  SYNC_SUCCEDED,
  SYNC_FAILED,
  INITIAL_ITEMS_LOADED,
} from './actionTypes';

export const initialState = {
  error: false,
  syncing: false,
  initialItemsLoaded: false,
};

export default function syncStateReducer(state = initialState, action) {
  switch (action.type) {
    case SYNC_STARTED:
      return {
        error: false,
        syncing: true,
        initialItemsLoaded: state.initialItemsLoaded,
      };
    case SYNC_FAILED:
      return {
        error: true,
        syncing: false,
        initialItemsLoaded: state.initialItemsLoaded,
      };
    case SYNC_SUCCEDED:
      return {
        error: false,
        syncing: false,
        initialItemsLoaded: state.initialItemsLoaded,
      };
    case INITIAL_ITEMS_LOADED:
      return {
        error: state.error,
        syncing: state.syncing,
        initialItemsLoaded: true,
      };
    default:
      return state;
  }
}
