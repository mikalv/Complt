import { REHYDRATE } from 'redux-persist/es/constants';
import { GET_PROFILE, LOGOUT } from './actionTypes';

export const initialState = {};

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return action.profile;
    case LOGOUT:
      return initialState;
    case REHYDRATE:
      return action.payload.profile;
    default:
      return state;
  }
}
