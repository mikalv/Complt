import reducer, { initialState } from '../profile';
import { getProfile, logout } from '../actions';

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
});
