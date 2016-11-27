import reducer, { initialState } from '../auth';
import { login, logout, getProfile } from '../actions';

const token = {
  accessToken: 'sdfsdfubdsghbdf234234',
  idToken: 'jdsfjnsdfjn.sdfjsdfjsdjknfsdf324324.sdfsdf23423434',
  idTokenPayload: {},
};

const profile = {
  name: 'Example Person',
  email: 'person@example.com',
  picture: 'http://gravatar.com/someperson',
};

describe('authReducer', () => {
  beforeAll(() => {
    global.localStorage = {
      setItem() {},
      removeItem() {},
    };
  });
  it('should return the inital state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it('should handle LOGIN', () => {
    expect(reducer(undefined, login(token))).toEqual({ token, profile: initialState.profile });
  });
  it('should handle GET_PROFILE', () => {
    expect(reducer(undefined, getProfile(profile))).toEqual({ token: initialState.token, profile });
  });
  it('should handle LOGOUT', () => {
    expect(reducer({ token, profile }, logout())).toEqual(initialState);
  });
});
