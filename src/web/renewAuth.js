import WebAuth from 'auth0-js/src/web-auth';
import logException from '../common/utils/logException';

const renewAuth = () => new Promise((resolve, reject) => {
  const audience = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo`;
  const redirectUri = `${window.location.origin}/callback`;
  const webAuth = new WebAuth({
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
    redirectUri,
    responseType: 'id_token',
    scope: 'openid',
    audience,
  });
  webAuth.renewAuth({
    audience,
    redirectUri,
  }, (err, result) => {
    if (err) {
      logException(new Error('There was an error renewing the auth token'), err);
      reject(err);
      return;
    }
    resolve(result.idToken);
  });
});

export default renewAuth;
