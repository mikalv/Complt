import reducer, { initialState } from '../auth';
import { login, logout, loginCallback } from '../actions';
import { LOGIN, GET_PROFILE } from '../actionTypes';
import history from '../../../web/history';
import logException from '../../utils/logException';
import getTokenInfo from '../../utils/getTokenInfo';
import mockStore from '../mockStore';

jest.mock('../../utils/logException').mock('../../utils/getTokenInfo');

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

describe('loginCallback()', () => {
  it('returns nothing if there is no result', () => {
    expect(loginCallback()()).toEqual(undefined);
    expect(logException).not.toBeCalled();
  });
  it('gets the profile, dispatches the correct actions and pushes to /', () => {
    history.push('/login');
    expect(history.location.pathname).toEqual('/login');
    getTokenInfo.mockReturnValue(Promise.resolve({ profileStuff: true }));
    const store = mockStore();
    store.dispatch(loginCallback(undefined, { idToken: token }));
    expect(store.getActions()).toEqual([{
      type: LOGIN, token,
    }]);
    expect(history.location.pathname).toEqual('/');
    return Promise.resolve().then(() => {
      expect(store.getActions()).toEqual([{
        type: LOGIN, token,
      }, {
        type: GET_PROFILE, profile: { profileStuff: true },
      }]);
    });
  });
  it('logs the error if there is one', () => {
    loginCallback(new Error('Some Error'))();
    expect(logException).toBeCalledWith(new Error('Some Error'));
  });
});
