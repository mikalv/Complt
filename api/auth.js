import authenticationClient from './authClient';
import isTokenExpired from '../src/utils/auth';

function getToken(tokenWithBearer) {
  const match = tokenWithBearer.match(/^Bearer (.*)$/);
  if (!match || match.length < 2) {
    return null;
  }
  return match[1];
}

const getUserId = (tokenWithBearer) => {
  const token = getToken(tokenWithBearer);
  if (token === null) return Promise.reject('Token not found');
  if (isTokenExpired(token)) return Promise.reject('Token incorrect or expired');
  return authenticationClient.tokens.getInfo(token).then((user) => {
    if (typeof user === 'object') return user;
    return Promise.reject('Unauthorized');
  });
};

export default getUserId;
