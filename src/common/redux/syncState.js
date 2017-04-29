import { SYNC_STARTED, SYNC_SUCCEDED, SYNC_FAILED } from './actionTypes';

export const initialState = {
  error: false,
  syncing: false,
};

export default function syncStateReducer(state = initialState, action) {
  switch (action.type) {
    case SYNC_STARTED:
      return {
        error: false,
        syncing: true,
      };
    case SYNC_FAILED:
      return {
        error: true,
        syncing: false,
      };
    case SYNC_SUCCEDED:
      return {
        error: false,
        syncing: false,
      };
    default:
      return state;
  }
}
