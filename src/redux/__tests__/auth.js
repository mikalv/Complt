import reducer, { initialState } from '../auth';
import { login, logout } from '../actions';

const token = 'jdsfjnsdfjn.sdfjsdfjsdjknfsdf324324.sdfsdf23423434';

describe('authReducer', () => {
  it('returns the inital state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it('handles LOGIN correctly', () => {
    expect(reducer(undefined, login(token))).toEqual(token);
  });
  it('handles LOGOUT correctly', () => {
    expect(reducer(token, logout())).toEqual(initialState);
  });
});
