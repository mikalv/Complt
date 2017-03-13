import WebAuth from 'auth0-js/src/web-auth';
import logException from '../../common/utils/logException';
import { renewAuth } from '../renewAuth';

jest.mock('auth0-js/src/web-auth').mock('../../common/utils/logException');

const redirectUri = 'http://localhost/callback';
const audience = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo`;

describe('renewAuth', () => {
  it('instantiates WebAuth correctly', () => {
    renewAuth(WebAuth);
    expect(WebAuth).toBeCalledWith({
      domain: process.env.REACT_APP_AUTH0_DOMAIN,
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      redirectUri,
      responseType: 'id_token',
      scope: 'openid',
      audience,
    });
  });
  it('resolves with the token if webAuth.renewAuth does not return an error', () => {
    const renewAuthPromise = renewAuth(WebAuth);
    const renewAuthCall = WebAuth.mock.instances[1].renewAuth.mock.calls[0];
    expect(renewAuthCall[0]).toEqual({
      audience,
      redirectUri,
    });
    renewAuthCall[1](undefined, { idToken: 'some.valid.token' });
    return renewAuthPromise.then((idToken) => {
      expect(idToken).toEqual('some.valid.token');
    });
  });
  it('rejects with the error if webAuth.renewAuth calls the callback with an error', () => {
    const renewAuthPromise = renewAuth(WebAuth);
    const renewAuthCall = WebAuth.mock.instances[2].renewAuth.mock.calls[0];
    expect(renewAuthCall[0]).toEqual({
      audience,
      redirectUri,
    });
    renewAuthCall[1]({ error: true, thing: 'something' }, { idToken: 'some.valid.token' });
    return renewAuthPromise.then(() => {
      expect(true).toEqual(false);
    }).catch((error) => {
      expect(logException).toBeCalledWith(new Error('There was an error renewing the auth token'), { error: true, thing: 'something' });
      expect(error).toEqual({ error: true, thing: 'something' });
    });
  });
});
