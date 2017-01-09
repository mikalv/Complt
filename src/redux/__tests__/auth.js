import reducer, { initialState } from '../auth';
import { login, logout } from '../actions';

const token = 'jdsfjnsdfjn.sdfjsdfjsdjknfsdf324324.sdfsdf23423434';

describe('authReducer', () => {
  it('should return the inital state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it('should handle LOGIN', () => {
    expect(reducer(undefined, login(token))).toEqual(token);
  });
  it('should handle LOGOUT', () => {
    expect(reducer(token, logout())).toEqual(initialState);
  });
});