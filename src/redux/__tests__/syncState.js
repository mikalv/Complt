import PouchDB from 'pouchdb-memory';
import reducer, { initialState } from '../syncState';
import { syncStarted, syncFailed, syncSucceded, sync, syncOnError, syncOnComplete } from '../actions';
import { SYNC_STARTED, SYNC_FAILED, SYNC_SUCCEDED, SHOW_TOAST } from '../actionTypes';
import logException from '../../utils/logException';
import isTokenExpired from '../../utils/auth';
import mockStore from '../mockStore';

jest.mock('../../db').mock('../../utils/auth').mock('../../utils/logException');

PouchDB.preferredAdapters = ['memory'];

isTokenExpired.mockReturnValue(true);

describe('syncReducer', () => {
  it('returns the inital state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it('handles SYNC_STARTED correctly', () => {
    expect(reducer(undefined, syncStarted())).toEqual({
      syncing: true,
      error: false,
    });
  });
  it('handles SYNC_FAILED correctly', () => {
    expect(reducer(undefined, syncFailed())).toEqual({
      syncing: false,
      error: true,
    });
  });
  it('handled SYNC_SUCCEDED correctly', () => {
    expect(reducer(undefined, syncSucceded())).toEqual({
      syncing: false,
      error: false,
    });
  });
});

describe('sync() action creator', () => {
  it('dispatches the correct actions when the auth token is expired', () => {
    isTokenExpired.mockReturnValueOnce(true);
    const store = mockStore({ auth: 'some.expired.token' });
    store.dispatch(sync());
    expect(isTokenExpired).toBeCalledWith('some.expired.token');
    const actions = store.getActions();
    expect(actions[0].type).toEqual(SHOW_TOAST);
    expect(actions[0].toast.text).toEqual('Please sign in to sync');
    expect(actions[0].toast.action.label).toEqual('SIGN IN');
    expect(actions[1]).toEqual({ type: SYNC_FAILED });
    expect(actions.length).toEqual(2);
  });
  it('dispatches the correct actions when the sync fails with a 401', () => {
    const store = mockStore();
    syncOnError(store.dispatch)({ status: 401 });
    const actions = store.getActions();
    expect(actions[0].type).toEqual(SHOW_TOAST);
    expect(actions[0].toast.text).toEqual('Please sign in to sync');
    expect(actions[0].toast.action.label).toEqual('SIGN IN');
    expect(actions[1]).toEqual({ type: SYNC_FAILED });
  });
  it('dispatches the correct actions when the sync fails with an error that is not a 401', () => {
    const store = mockStore();
    syncOnError(store.dispatch)({ status: 500 });
    const actions = store.getActions();
    expect(actions).toEqual([
      { type: SHOW_TOAST, toast: { text: 'An error occured while syncing, please try again later' } },
      { type: SYNC_FAILED },
    ]);
    expect(logException).toBeCalledWith(new Error('An error occured while syncing'), { status: 500 });
  });
  it('dispatches the correct actions when the sync starts', () => {
    isTokenExpired.mockReturnValueOnce(false);
    const store = mockStore({ auth: 'some.valid.token' });
    store.dispatch(sync());
    expect(isTokenExpired).toBeCalledWith('some.valid.token');
    const actions = store.getActions();
    expect(actions).toEqual([
      { type: SYNC_STARTED },
      { type: SHOW_TOAST, toast: { text: 'Syncing Started, Please Wait...' } },
    ]);
  });
  it('dispatches the correct acions when the sync completes', () => {
    const store = mockStore();
    syncOnComplete(store.dispatch)();
    const actions = store.getActions();
    expect(actions).toEqual([
      { type: SHOW_TOAST, toast: { text: 'Syncing finished' } },
      { type: SYNC_SUCCEDED },
    ]);
  });
});
