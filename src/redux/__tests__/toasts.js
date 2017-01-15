import reducer, { initialState } from '../toasts';
import { showToast, dismissToast } from '../actions';

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
