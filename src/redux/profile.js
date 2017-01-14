import { GET_PROFILE, LOGOUT } from './actionTypes';

export const initialState = {};

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return action.profile;
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}
