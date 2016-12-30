import { LOGIN, LOGOUT } from './actionTypes';

export const initialState = '';

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return action.token;
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}
