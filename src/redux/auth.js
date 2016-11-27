import { LOGIN, LOGOUT, GET_PROFILE } from './actionTypes';

export const initialState = {
  token: {
    idToken: '',
  },
  profile: {
    email: '',
    picture: '',
    name: '',
  },
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        token: action.token,
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.profile,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}