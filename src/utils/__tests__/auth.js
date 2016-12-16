import mockDate from 'mockdate';
import isTokenExpired from '../auth';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0ODE4Njg5NDh9.xwSMLlXBJRO3S2Ro5vBzjvbsL1A1-PYg28b4tMw-DKc';
const tokenWithoutExp = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.3m-8plZgXl2r0gXsQ3xGtZv0ztXLoOiwEPaBlX1jpBM';
describe('isTokenExpired(token)', () => {
  it('returns true if no token is given', () => {
    expect(isTokenExpired()).toEqual(true);
  });
  it('returns true if a token is expired', () => {
    expect(isTokenExpired(token)).toEqual(true);
  });
  it('returns true if the token does not a exp property', () => {
    expect(isTokenExpired(tokenWithoutExp)).toEqual(true);
  });
  it('returns false if a token is not expired', () => {
    mockDate.set(1481868848);
    expect(isTokenExpired(token)).toEqual(false);
  });
});
