const getTokenInfo = token =>
  fetch(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/tokeninfo`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ id_token: token }),
  }).then(response => response.json());

export default getTokenInfo;
