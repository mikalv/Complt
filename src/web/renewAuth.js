import logException from '../common/utils/logException';

export const renewAuth = WebAuth =>
  new Promise((resolve, reject) => {
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
    webAuth.renewAuth(
      {
        audience,
        redirectUri,
      },
      (err, result) => {
        if (err) {
          if (err.error !== 'login_required')
            logException(
              new Error('There was an error renewing the auth token'),
              err
            );
          reject(err);
          return;
        }
        resolve(result.idToken);
      }
    );
  });

const renewAuthWithImport = () =>
  import('auth0-js/src/web-auth').then(renewAuth);

export default renewAuthWithImport;
