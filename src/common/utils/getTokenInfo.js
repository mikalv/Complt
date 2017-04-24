const getTokenInfo = token =>
  fetch(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/tokeninfo`, {
    method: 'POST',
    headers: new Headers({ 'content-type': 'application/json' }),
    body: JSON.stringify({ id_token: token }),
  })
    .then(response => response.json())
    .then(profile => {
      import('raven-js').then(Raven => {
        Raven.setUserContext({ email: profile.email, id: profile.user_id });
      });
      return profile;
    });

export default getTokenInfo;
