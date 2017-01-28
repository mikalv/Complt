import jwtDecode from 'jwt-decode';

const getTokenExpirationDate = (token) => {
  try {
    const decoded = jwtDecode(token);
    if (!decoded.exp) {
      return null;
    }
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  } catch (error) {
    return null;
  }
};


const isTokenExpired = (token) => {
  if (!token) return true;
  const date = getTokenExpirationDate(token);
  if (date === null) return true;
  return !(date.valueOf() > (new Date().valueOf()));
};

export default isTokenExpired;
