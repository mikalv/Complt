import { REHYDRATE } from 'redux-persist/es/constants';
import reducer, { initialState } from '../profile';
import { getProfile, logout } from '../actions';

jest.mock('../../../web/showToast');

const profile = {
  email: 'somePerson@some.domain',
  name: 'Some Person',
};

describe('profileReducer', () => {
  it('returns the inital state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it('handles GET_PROFILE correctly', () => {
    expect(reducer(undefined, getProfile(profile))).toEqual(profile);
  });
  it('handles LOGOUT correctly', () => {
    expect(reducer(profile, logout())).toEqual(initialState);
  });
  it('handles REHYDRATE correctly', () => {
    expect(
      reducer(initialState, { type: REHYDRATE, payload: { profile } })
    ).toEqual(profile);
  });
  it('handles REHYDRATE correctly when it is not defined in localStorage', () => {
    expect(
      reducer(initialState, {
        type: REHYDRATE,
        payload: { profile: undefined },
      })
    ).toEqual(initialState);
  });
});
