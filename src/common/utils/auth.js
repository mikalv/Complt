function decodeJWT(jwt) {
  const array = jwt.split('.');
  if (array.length !== 3) return;
  const data = JSON.parse(global.atob(array[1]));
  return data; // eslint-disable-line consistent-return
}

const getTokenExpirationDate = token => {
  try {
    const decoded = decodeJWT(token);
    if (!decoded || !decoded.exp) {
      return null;
    }
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  } catch (error) {
    return null;
  }
};

const isTokenExpired = token => {
  if (!token) return true;
  const date = getTokenExpirationDate(token);
  if (date === null) return true;
  return !(date.valueOf() > new Date().valueOf());
};

export default isTokenExpired;
