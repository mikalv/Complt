import { LOGIN, LOGOUT } from './actionTypes';

export const initialState = {
  token: {
    idToken: '',
  },
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem('token', action.token.idToken);
      return {
        ...state,
        token: action.token,
      };
    case LOGOUT:
      localStorage.removeItem('token');
      return initialState;
    default:
      return state;
  }
}
