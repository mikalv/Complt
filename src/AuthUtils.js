import jwtDecode from 'jwt-decode';

const getTokenExpirationDate = (token) => {
  const decoded = jwtDecode(token);
  if (!decoded.exp) {
    return null;
  }
  const date = new Date(0);
  date.setUTCSeconds(decoded.exp);
  return date;
};


const isTokenExpired = (token) => {
  if (!token) return true;
  const date = getTokenExpirationDate(token);
  const offsetSeconds = 0;
  if (date === null) {
    return false;
  }
  return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)));
};

export default isTokenExpired;
