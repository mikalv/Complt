import { AuthenticationClient } from 'auth0';

const authenticationClient = new AuthenticationClient({
  domain: 'oakapp.auth0.com',
  clientId: 'y7tj9sJYELA92W4KdpQaZJ1MwO9NbbFX',
});

function getToken(tokenWithBearer) {
  const match = tokenWithBearer.match(/^Bearer (.*)$/);
  if (!match || match.length < 2) {
    return null;
  }
  return match[1];
}

const getUserId = tokenWithBearer => new Promise((resolve, reject) => {
  const token = getToken(tokenWithBearer);
  if (token === null) reject('Token not found');
  authenticationClient.tokens.getInfo(token).then(thing =>
  resolve(thing)).catch(error => reject(error));
});

export default getUserId;