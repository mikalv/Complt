import reducer, { initialState } from '../syncState';
import {
  syncStarted,
  syncFailed,
  syncSucceded,
  sync,
  attemptSync,
  initialItemsLoaded,
} from '../actions';
import {
  SYNC_STARTED,
  SYNC_FAILED,
  SYNC_SUCCEDED,
  LOGIN,
} from '../actionTypes';
import logException from '../../utils/logException';
import pouchDBSync from '../../utils/pouchDBSync';
import renewAuth from '../../../web/renewAuth';
import isTokenExpired from '../../utils/auth';
import showToast from '../../../web/showToast';
import mockStore from '../mockStore';

jest
  .mock('../../db')
  .mock('../../utils/auth')
  .mock('../../utils/logException')
  .mock('../../utils/pouchDBSync')
  .mock('../../../web/renewAuth')
  .mock('../../../web/showToast');

isTokenExpired.mockReturnValue(true);
pouchDBSync.mockReturnValue(Promise.resolve());
renewAuth.mockReturnValue(Promise.reject());

describe('syncReducer', () => {
  it('returns the inital state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it('handles SYNC_STARTED correctly', () => {
    expect(reducer(undefined, syncStarted())).toEqual({
      syncing: true,
      error: false,
      initialItemsLoaded: false,
    });
  });
  it('handles SYNC_FAILED correctly', () => {
    expect(reducer(undefined, syncFailed())).toEqual({
      syncing: false,
      error: true,
      initialItemsLoaded: false,
    });
  });
  it('handles SYNC_SUCCEDED correctly', () => {
    expect(reducer(undefined, syncSucceded())).toEqual({
      syncing: false,
      error: false,
      initialItemsLoaded: false,
    });
  });
  it('handles INITIAL_ITEMS_LOADED correctly', () => {
    expect(reducer(undefined, initialItemsLoaded())).toEqual({
      syncing: false,
      error: false,
      initialItemsLoaded: true,
    });
  });
});

describe('attemptSync()', () => {
  it('dispatches the correct actions when the sync starts', () => {
    isTokenExpired.mockReturnValueOnce(false);
    const store = mockStore({ auth: 'some.valid.token' });
    store.dispatch(attemptSync());
    expect(isTokenExpired).toBeCalledWith('some.valid.token');
    const actions = store.getActions();
    expect(actions).toEqual([{ type: SYNC_STARTED }]);
  });
  it('dispatches the correct actions when renewAuth resolves', () => {
    isTokenExpired.mockReturnValueOnce(true);
    renewAuth.mockReturnValueOnce(Promise.resolve('some.valid.token'));
    fetch.mockResponseOnce(
      JSON.stringify({ email: 'somePerson@some.domain', name: 'Some Person' })
    );
    const store = mockStore({ auth: 'some.expired.token' });
    store.dispatch(attemptSync());
    expect(isTokenExpired).toBeCalledWith('some.expired.token');
    return Promise.resolve().then(() => {
      expect(renewAuth).toBeCalled();
      const actions = store.getActions();
      expect(actions).toEqual([
        { type: SYNC_STARTED },
        { type: LOGIN, token: 'some.valid.token' },
      ]);
      expect(pouchDBSync).toBeCalledWith(
        'some.valid.token',
        process.env.REACT_APP_COUCH_URL
      );
    });
  });
  it('dispatches the correct actions when renewAuth rejects', () => {
    isTokenExpired.mockReturnValueOnce(true);
    renewAuth.mockReturnValueOnce(Promise.reject());
    const store = mockStore({ auth: 'some.expired.token' });
    return attemptSync()(store.dispatch, store.getState).then(() => {
      expect(isTokenExpired).toBeCalledWith('some.expired.token');
      expect(renewAuth).toBeCalled();
      const actions = store.getActions();
      expect(actions).toEqual([{ type: SYNC_STARTED }, { type: SYNC_FAILED }]);
      expect(showToast).toBeCalled();
    });
  });
});

describe('sync() action creator', () => {
  it('dispatches the correct actions when the sync fails with a 401', () => {
    const store = mockStore();
    pouchDBSync.mockReturnValueOnce(Promise.reject({ status: 401 }));
    return sync(store.dispatch, store.getState)().then(() => {
      expect(showToast).toBeCalled();
    });
  });
  it('dispatches the correct actions when the sync fails with an error that is not a 401', () => {
    const store = mockStore();
    pouchDBSync.mockReturnValueOnce(Promise.reject({ status: 500 }));
    return sync(store.dispatch, store.getState)().then(() => {
      const actions = store.getActions();
      expect(actions).toEqual([{ type: SYNC_FAILED }]);
      expect(showToast).toBeCalledWith({
        message: 'An error occured while syncing, please try again later',
      });
      expect(logException).toBeCalledWith(
        new Error('An error occured while syncing'),
        { status: 500 }
      );
    });
  });
  it('dispatches the correct acions when the sync completes', () => {
    const store = mockStore();
    pouchDBSync.mockReturnValueOnce(Promise.resolve());
    return sync(store.dispatch, store.getState)().then(() => {
      const actions = store.getActions();
      expect(actions).toEqual([{ type: SYNC_SUCCEDED }]);
    });
  });
  it('calls pouchDBSync correctly', () => {
    const store = mockStore({ auth: 'some.auth.token' });
    pouchDBSync.mockReturnValueOnce(Promise.resolve());
    return sync(store.dispatch, store.getState)().then(() => {
      expect(pouchDBSync).toBeCalledWith(
        'some.auth.token',
        process.env.REACT_APP_COUCH_URL
      );
    });
  });
});
