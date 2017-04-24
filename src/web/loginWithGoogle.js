const login = (callback, state) =>
  import('auth0-js/src/web-auth').then(WebAuth => {
    const audience = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo`;
    const redirectUri = `${window.location.origin}/login`;
    const auth0 = new WebAuth({
      domain: process.env.REACT_APP_AUTH0_DOMAIN,
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      redirectUri,
      responseType: 'id_token',
      scope: 'openid',
      audience,
    });
    if (!process.env.REACT_APP_ELECTRON) {
      auth0.authorize({
        connection: 'google-oauth2',
        state: JSON.stringify(state),
      });
    } else {
      auth0.popup.authorize(
        {
          connection: 'google-oauth2',
        },
        callback
      );
    }
  });

export default login;
