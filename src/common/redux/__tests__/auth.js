import { route } from 'preact-router';
import reducer, { initialState } from '../auth';
import { login, logout, loginCallback } from '../actions';
import { LOGIN, GET_PROFILE, SYNC_STARTED } from '../actionTypes';
import logException from '../../utils/logException';
import getTokenInfo from '../../utils/getTokenInfo';
import mockStore from '../mockStore';

jest
  .mock('../../utils/logException')
  .mock('../../utils/getTokenInfo')
  .mock('../../../web/showToast')
  .mock('preact-router');

getTokenInfo.mockReturnValue(Promise.resolve({ profileStuff: true }));

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
  it('gets the profile, dispatches the correct actions and pushes to the pathname passed', () => {
    const store = mockStore();
    const encodedState = encodeURIComponent(
      JSON.stringify({ pathname: '/projects' })
    );
    store.dispatch(
      loginCallback(undefined, { idToken: token, state: encodedState })
    );
    expect(store.getActions()).toEqual([
      {
        type: LOGIN,
        token,
      },
    ]);
    expect(route).toBeCalledWith('/projects', true);
    return Promise.resolve().then(() => {
      expect(store.getActions()).toEqual([
        {
          type: LOGIN,
          token,
        },
        {
          type: GET_PROFILE,
          profile: { profileStuff: true },
        },
      ]);
    });
  });
  it('pushes to / if it is not passed a pathname and dispatches attemptSync if shouldSync is true', () => {
    const store = mockStore();
    const encodedState = encodeURIComponent(
      JSON.stringify({ shouldSync: true })
    );
    store.dispatch(
      loginCallback(undefined, { idToken: token, state: encodedState })
    );
    expect(store.getActions()).toEqual([
      {
        type: LOGIN,
        token,
      },
      {
        type: SYNC_STARTED,
      },
    ]);
    expect(route).toBeCalledWith('/', true);
    return Promise.resolve().then(() => {
      expect(store.getActions()).toEqual([
        {
          type: LOGIN,
          token,
        },
        {
          type: SYNC_STARTED,
        },
        {
          type: GET_PROFILE,
          profile: { profileStuff: true },
        },
      ]);
    });
  });
  it('pushes to / and does not dispatch attemptSync if the state is not valid JSON', () => {
    const store = mockStore();
    store.dispatch(
      loginCallback(undefined, { idToken: token, state: 'some invalid JSON' })
    );
    expect(store.getActions()).toEqual([
      {
        type: LOGIN,
        token,
      },
    ]);
    expect(route).toBeCalledWith('/', true);
    return Promise.resolve().then(() => {
      expect(store.getActions()).toEqual([
        {
          type: LOGIN,
          token,
        },
        {
          type: GET_PROFILE,
          profile: { profileStuff: true },
        },
      ]);
    });
  });
  it('logs the error if there is one', () => {
    loginCallback(new Error('Some Error'))();
    expect(logException).toBeCalledWith(new Error('Some Error'));
  });
});
