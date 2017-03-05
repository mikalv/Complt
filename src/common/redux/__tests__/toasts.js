import reducer, { initialState } from '../toasts';
import { showToast, dismissToast, showSignInToast } from '../actions';
import { SHOW_TOAST } from '../actionTypes';
import mockStore from '../mockStore';

const toast = {
  text: 'This is a toast',
};
const otherToast = {
  text: 'This is another toast',
};

describe('toastsReducer', () => {
  it('returns the inital state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it('handles SHOW_TOAST correctly', () => {
    expect(reducer([toast], showToast(otherToast))).toEqual([toast, otherToast]);
  });
  it('handles DISMISS_TOAST correctly', () => {
    expect(reducer([toast, otherToast], dismissToast())).toEqual([otherToast]);
  });
});

describe('showSignInToast() action creator', () => {
  it('dispatches SHOW_TOAST correctly', () => {
    const store = mockStore();
    store.dispatch(showSignInToast());
    const actions = store.getActions();
    expect(actions[0].type).toEqual(SHOW_TOAST);
    expect(actions[0].toast.text).toEqual('Please sign in to sync');
    expect(actions[0].toast.action.label).toEqual('SIGN IN');
    expect(typeof actions[0].toast.action.onClick).toEqual('function');
    actions[0].toast.action.onClick();
  });
});
