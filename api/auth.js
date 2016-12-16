import { AuthenticationClient } from 'auth0';

const authenticationClient = new AuthenticationClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
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
