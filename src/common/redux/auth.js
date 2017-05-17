import { REHYDRATE } from 'redux-persist/es/constants';
import { LOGIN, LOGOUT } from './actionTypes';

export const initialState = '';

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return action.token;
    case LOGOUT:
      return initialState;
    case REHYDRATE:
      if (state === initialState) return action.payload.auth;
      return state;
    default:
      return state;
  }
}
